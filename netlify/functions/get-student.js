const { Client } = require('@notionhq/client');

exports.handler = async (event) => {
  const notion = new Client({ auth: process.env.NOTION_KEY });
  // ★ 원장님 주소에서 제가 뽑아낸 '진짜 ID'입니다. (건드리지 마세요!)
  const databaseId = '2e88e00f84408099a3e5f0f3acaf5c96'; 

  try {
    const name = event.queryStringParameters.name || '김도일';
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: '이름',  // ★ 수식 말고 맨 앞 '이름' 칸을 봅니다.
        title: {           // ★ 제목(Title) 속성에서
          contains: name   // ★ '김도일'이 포함되어 있으면 다 가져옵니다. (기말성적 붙어있어도 OK)
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