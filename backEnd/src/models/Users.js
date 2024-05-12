const { dbUser } = require("../db/dataBase");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const insertUser = async (name, email, cpf, password) => {
  try {
    const hashPassword = bcrypt.hashSync(password, salt);
    const query = `INSERT INTO users.user (name, email, cpf, password) VALUES (?, ?, ?, ?)`;

    const params = [name, email, cpf, hashPassword];
    const result = await dbUser.query(query, params);

    return result;
  } catch (error) {
    console.log(error);
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

const getUserByCpfAndPassword = async (cpf, password) => {
  const query = `SELECT * FROM users.user WHERE cpf = ?`;
  const params = [cpf];
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
  getUserByCpfAndPassword,
};
