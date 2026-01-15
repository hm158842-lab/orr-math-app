const { Client } = require('@notionhq/client');

exports.handler = async (event) => {
  // 1. 넷리파이 설정창에 넣으신 비밀번호를 가져와 로봇을 깨웁니다.
  const notion = new Client({ auth: process.env.NOTION_KEY });
  
  // 2. 원장님의 진짜 노션 표 주소 키입니다.
  const databaseId = '2e88e00f84408099a3e5f0f3acaf5c96'; 
  
  const name = event.queryStringParameters.name || '김도일';

  try {
    // 3. 노션 표에서 StudentId 칸에 '김도일'이 있는지 찾습니다.
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'StudentId',
        rich_text: {
          contains: name
        }
      }
    });

    // 4. 만약 검색 결과가 없으면 에러 메시지를 보냅니다.
    if (!response.results || response.results.length === 0) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ 
          error: "데이터 없음", 
          msg: name + " 학생을 찾지 못했습니다.",
          tip: "노션의 StudentId 칸이 '텍스트' 유형인지 꼭 확인하세요!" 
        })
      };
    }

    // 5. 성공하면 데이터를 화면으로 보냅니다.
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(response.results[0]),
    };
  } catch (error) {
    // 6. 서버 연결 자체가 안 될 때 에러를 출력합니다.
    return { 
      statusCode: 500, 
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ error: "서버 오류", message: error.message }) 
    };
  }
};