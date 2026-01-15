const { Client } = require('@notionhq/client');

exports.handler = async (event) => {
  const notion = new Client({ auth: process.env.NOTION_KEY });
  // 원장님 주소창에서 추출한 정확한 데이터베이스 ID입니다.
  const databaseId = '2e88e00f84408099a3e5f0f3acaf5c96'; 

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 1  // 검색 안 하고 무조건 첫 번째 줄을 가져옵니다.
    });
    
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response.results[0] || {}),
    };
  } catch (error) {
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: error.message }) 
    };
  }
};