const { Client } = require('@notionhq/client');

exports.handler = async (event) => {
  const notion = new Client({ auth: process.env.NOTION_KEY });
  const databaseId = '2e88e00f84408099a3e5f0f3acaf5c96'; // ★ 원장님 DB ID (32자리) 확인!

  try {
    const name = event.queryStringParameters.name || '김도일';
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'StudentId', // ★ 방금 만든 수식 칸을 검사합니다!
        formula: {
          string: {
            contains: name
          }
        }
      }
    });
    return {
      statusCode: 200,
      body: JSON.stringify(response.results[0] || {}),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};