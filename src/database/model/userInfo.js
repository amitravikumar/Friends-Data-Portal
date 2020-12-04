const { DataTypes } = require("sequelize");
const friendsDb = require("../config/dbConfig");

const userInfo = friendsDb.define("user_info", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "first_name"
  },
  lastName: {
    type: DataTypes.STRING,
    field: "last_name"
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
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
});

module.exports = userInfo;
