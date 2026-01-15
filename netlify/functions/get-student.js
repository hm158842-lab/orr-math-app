const { Client } = require('@notionhq/client');

exports.handler = async (event) => {
  const notion = new Client({ auth: process.env.NOTION_KEY });
  const databaseId = '2e88e00f84408099a3e5f0f3acaf5c96'; // 원장님 주소 확인 완료
  const name = event.queryStringParameters.name || '김도일';

  try {
    // 원장님 말씀대로 '텍스트(rich_text)' 방식으로 'StudentId' 칸을 검색합니다.
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'StudentId',
        rich_text: {
          contains: name
        }
      }
    });

    // 만약 검색 결과가 0개라면, 노션에 있는 '진짜 데이터'가 어떻게 생겼는지 화면에 뿌립니다.
    if (response.results.length === 0) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ 
          error: "데이터를 찾지 못함",
          hint: "노션 StudentId 칸에 '" + name + "'이 정확히 있는지 확인하세요.",
          dbId: databaseId
        })
      };
    }

    // 성공하면 학생 데이터를 보냅니다.
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(response.results[0]),
    };
  } catch (error) {
    // 접속 자체가 안 되는 경우 (키 오류 등)
    return { 
      statusCode: 500, 
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ error: "서버 접속 실패", detail: error.message }) 
    };
  }
};