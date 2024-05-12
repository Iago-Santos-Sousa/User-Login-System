const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "6h" });
  return token;
};

const login = async (cpf, password) => {
  if (!cpf || !password) {
    throw new Error("Parâmetros inválidos!");
  }

  try {
    const user = await UserModel.getUserByCpfAndPassword(cpf, password);

    if (user && user.length > 0) {
      const result = {
        nome: user[0].name,
        email: user[0].email,
        cpf: user[0].cpf,
      };

      // Gera o token com o as credenciais do usuário como payload
      const token = generateToken(result);
      console.log(token);

      // Retorna as credenciais e o token formado
      return { user: result, token: token };
    } else {
      throw new Error("Credenciais inválidas!");
    }
  } catch (error) {
    throw new Error("Erro ao realizar o login!");
  }
};

const createUser = async (req, res) => {
  const { name, email, cpf, password } = req.body;
  try {
    const result = await UserModel.insertUser(name, email, cpf, password);
    console.log(result);
    res.status(200).json({ message: "Usuário criado" });
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

module.exports = {
  login,
  getUsers,
  createUser,
};
