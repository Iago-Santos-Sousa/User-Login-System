const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "6h" });
  return token;
};

const login = async (email, password) => {
  if (!email || !password) {
    throw new Error("Parâmetros inválidos!");
  }

  try {
    const user = await UserModel.getUserEmailAndPassword(email, password);

    if (user && user.length > 0) {
      const result = {
        nome: user[0].name,
        email: user[0].email,
        userId: user[0].user_id,
      };

      // Gera o token com o as credenciais do usuário como payload
      const token = generateToken(result);
      console.log(token);

      // Retorna as credenciais do usuário e o token formado
      return { user: result, token: token };
    } else {
      throw new Error("Credenciais inválidas!");
    }
  } catch (error) {
    throw new Error("Erro ao realizar o login!");
  }
};

const generateLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao realizar login: ", error);
    res.status(401).json({ error: "Credenciais inválidas" });
  }
};

const createUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !email || !password) {
      return res.status(400).json({ message: "Dados faltando!" });
    }

    const existUser = await UserModel.findUser(email);

    if (existUser && existUser.length > 0) {
      return res
        .status(400)
        .json({ message: "Já existe um usuário com esse email!" });
    }

    const result = await UserModel.insertUser(userName, email, password);
    console.log(result);
    res.status(200).json({ message: "Usuário criado!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ocorreu um erro!",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const results = await UserModel.findUsers();
    res.status(200).json({ results });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ocorreu um erro!",
    });
  }
};

const uploadImgUser = async (img) => {};

module.exports = {
  getUsers,
  createUser,
  generateLogin,
  uploadImgUser,
};
