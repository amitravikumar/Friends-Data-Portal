const { Sequelize } = require("sequelize");

const friendsDb = new Sequelize(process.env.DB_URL);

(async () => {
  try {
    await friendsDb.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = friendsDb;
