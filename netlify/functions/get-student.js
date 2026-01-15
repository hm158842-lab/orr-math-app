const { Client } = require('@notionhq/client');

exports.handler = async (event) => {
  // 1. 노션 로봇을 깨웁니다. (넷리파이에 설정한 NOTION_KEY 사용)
  const notion = new Client({ auth: process.env.NOTION_KEY });
  // 2. 원장님의 진짜 노션 표 ID입니다.
  const databaseId = '2e88e00f84408099a3e5f0f3acaf5c96'; 
  const name = event.queryStringParameters.name || '김도일';

  try {
    // 3. 노션에서 데이터를 찾아옵니다. 
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

    // 4. 만약 검색 결과가 없으면 상세 정보를 화면에 뿌립니다.
    if (!response.results || response.results.length === 0) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ 
          error: "DATA_NOT_FOUND", 
          msg: name + " 학생을 찾지 못했습니다.",
          check: "노션 StudentId 칸에 '" + name + "' 글자가 정확히 있는지 보세요."
        })
      };
    }

    // 5. 성공하면 데이터를 보냅니다.
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(response.results[0]),
    };
  } catch (error) {
    // 6. 에러 발생 시 (아까 났던 query is not a function 에러 등을 잡아냅니다)
    return { 
      statusCode: 500, 
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ error: "서버 오류", message: error.message }) 
    };
  }
};