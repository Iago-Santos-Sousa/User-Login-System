const router = require("express").Router();
const AuthService = require("../services/Users");
const authenticateToken = require("../middlewares/middleware");

// Aplicar o middleware de autenticação a todas as rotas
router.use(authenticateToken);

router.post("/login", async (req, res) => {
  try {
    const { cpf, password } = req.body;
    const result = await AuthService.login(cpf, password);
    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao realizar login: ", error);
    res.status(401).json({ error: "Credenciais inválidas" });
  }
});

router.get("/dashboard", async (req, res) => {
  const { user } = req;

  if (user) {
    console.log(user);
    res.status(200).json({ user });
  } else {
    res.status(401).json({ error: "Credenciais inválidas" });
  }
});

router.post("/create-user", AuthService.createUser);

module.exports = router;
