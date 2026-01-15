// 노션 최신 SDK를 불러옵니다.
const { Client } = require('@notionhq/client');

exports.handler = async (event) => {
  // 1. 로봇 초기화
  const notion = new Client({ auth: process.env.NOTION_KEY });
  const databaseId = '2e88e00f84408099a3e5f0f3acaf5c96'; 
  const name = event.queryStringParameters.name || '김도일';

  try {
    // 2. 버전 충돌을 방지하기 위해 가장 표준적인 query 명령을 내립니다.
    // 원장님이 바꾸신 '텍스트' 형식의 StudentId 칸을 검색합니다.
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'StudentId',
        rich_text: {
          contains: name
        }
      }
    });

    // 3. 데이터가 없으면 상세 이유를 보냅니다.
    if (!response.results || response.results.length === 0) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ error: "데이터 없음", msg: name + " 학생을 찾지 못했습니다." })
      };
    }

    // 4. 성공 시 데이터 반환
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(response.results[0]),
    };
  } catch (error) {
    // 5. 서버에 설치된 로봇 버전을 확인하기 위해 에러를 더 상세히 띄웁니다.
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