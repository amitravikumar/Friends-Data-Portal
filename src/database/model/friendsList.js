const { DataTypes } = require("sequelize");
const friendsDb = require("../config/dbConfig");
const userInfo = require("./userInfo");

const friendsList = friendsDb.define("friends_list", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: userInfo,
      key: "id"
    }
  },
  friendFirstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "friend_first_name"
  },
  friendLastName: {
    type: DataTypes.STRING,
    field: "friend_last_name"
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 15,
      max: 150
    }
  },
  gender: {
    type: DataTypes.ENUM,
    values: ["Male", "Female"],
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phoneno: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = friendsList;
