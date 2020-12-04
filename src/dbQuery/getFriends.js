const friendsData = require("../database/model/friendsList");
const getUserData = require("./getuser");

const getFriendsList = async (email) => {
  let user = await getUserData(email);
  const { id } = user[0];
  const result = await friendsData.findAll({ where: { userid: id } });
  return JSON.parse(JSON.stringify(result));
};

module.exports = getFriendsList;
