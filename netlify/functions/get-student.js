const { Client } = require('@notionhq/client');

exports.handler = async (event) => {
  // 1. 넷리파이에 설정한 비밀번호 키로 로봇을 깨웁니다.
  const notion = new Client({ auth: process.env.NOTION_KEY });
  // 2. 원장님의 진짜 노션 표 ID입니다.
  const databaseId = '2e88e00f84408099a3e5f0f3acaf5c96'; 
  const name = event.queryStringParameters.name || '김도일';

  try {
    // 3. 최신 로봇 명령어(query)로 노션 데이터를 찾아옵니다.
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'StudentId',
        rich_text: { contains: name }
      }
    });

    // 4. 데이터가 없으면 이유를 화면에 띄웁니다.
    if (!response.results || response.results.length === 0) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ error: "데이터 없음", msg: name + " 학생을 찾지 못했습니다." })
      };
    }

    // 5. 성공 시 데이터를 보냅니다.
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(response.results[0]),
    };
  } catch (error) {
    // 6. 에러가 나면 원인을 상세히 출력합니다.
    return { 
      statusCode: 500, 
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ 
        error: "서버 내부 오류", 
        message: error.message,
        hint: "넷리파이에서 'Clear cache and deploy'를 실행해야 할 수도 있습니다."
      }) 
    };
  }
};