const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");
const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
}

exports.handler = async (event) => {
  const { username, password, email, firstname, lastname } = JSON.parse(
    event.body
  );

  const hashedPassword = await hashPassword(password);

  await db.put({
    TableName: "jsonwebtoken-example",
    Item: {
      username,
      hashedPassword,
      email,
      firstname,
      lastname,
    },
  });

  return sendResponse({ success: true });
};
