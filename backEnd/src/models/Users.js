const { dbUser } = require("../db/dataBase");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const insertUser = async (name, email, password) => {
  try {
    const hashPassword = bcrypt.hashSync(password, salt);
    const query = `INSERT INTO users.user (name, email, password) VALUES (?, ?, ?)`;

    const params = [name, email, hashPassword];
    const [result] = await dbUser.query(query, params);

    return result;
  } catch (error) {
    console.log(error);
  }
};

const findUser = async (email) => {
  try {
    const paras = [email];
    const query = `SELECT * FROM users.user WHERE user.email = ?`;
    const [result] = await dbUser.query(query, paras);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const findUsers = async () => {
  try {
    const query = `SELECT * FROM users.user`;
    const [result] = await dbUser.query(query);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getUserEmailAndPassword = async (email, password) => {
  // cpf = cpf.replace(/[.-]/g, "");
  const query = `SELECT * FROM users.user WHERE email = ?`;
  const params = [email];
  const [results] = await dbUser.query(query, params);

  if (!results || !results[0]) {
    throw new Error("Usuário inválido!");
  }

  // Faz a comparação da senha do usuário com o hash do bcrypt
  const passwordResult = await bcrypt.compare(password, results[0].password);

  if (!passwordResult) {
    throw new Error("Usuário inválido!");
  }

  return results;
};

module.exports = {
  findUsers,
  insertUser,
  getUserEmailAndPassword,
  findUser,
};
