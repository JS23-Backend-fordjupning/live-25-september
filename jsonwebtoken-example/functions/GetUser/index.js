const middy = require("@middy/core");
const { validateToken } = require("../../middleware/auth");
const { sendResponse, sendError } = require("../../responses/index");

async function getUser(username) {
  const { Item } = db.get({
    TableName: "jsonwebtoken-example",
    Key: {
      username: username,
    },
  });

  return Item;
}

const handler = middy()
  .use(validateToken)
  .handler(async (event) => {
    const user = await getUser(event.username);

    return sendResponse({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  });

module.exports = { handler };
