const { Client } = require('@notionhq/client');

exports.handler = async (event) => {
  const notion = new Client({ auth: process.env.NOTION_KEY });
  const databaseId = '2e88e00f84408099a3e5f0f3acaf5c96'; 
  const name = event.queryStringParameters.name || '김도일';

  try {
    // 1. 노션에 접속해서 데이터를 찾아봅니다.
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'StudentId',
        rich_text: { contains: name }
      }
    });

    // 2. 만약 검색 결과가 없다면, 왜 없는지 화면에 뿌려줍니다.
    if (response.results.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ 
          errorMessage: "노션에서 데이터를 찾지 못했습니다.",
          triedName: name,
          databaseId: databaseId,
          hint: "노션의 StudentId 칸에 정확히 '" + name + "' 글자가 있는지 확인하세요."
        })
      };
    }

    // 3. 성공하면 데이터를 보냅니다.
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response.results[0]),
    };
  } catch (error) {
    // 4. 아예 접속 자체가 안 되면 에러 메시지를 보냅니다.
    return { 
      statusCode: 500, 
      body: JSON.stringify({ 
        errorMessage: "서버 접속 에러 발생",
        errorDetail: error.message 
      }) 
    };
  }
};