const bcrypt = require("bcrypt");
const saltRounds = 10;

const hash = (plainText) => {
  const hashedValue = bcrypt.hashSync(plainText, saltRounds);
  return hashedValue;
};

const compareHash = (plainText, existingHash) => {
  const result = bcrypt.compareSync(plainText, existingHash);
  return result;
};

module.exports = { hash, compareHash };
