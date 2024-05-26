const router = require("express").Router();
const AuthService = require("../services/Users");
const authenticateToken = require("../middlewares/middleware");

// Aplicar o middleware de autenticação a todas as rotas
router.use(authenticateToken);

router.post("/create-user", AuthService.createUser);
router.post("/login", AuthService.generateLogin);
router.post("/upload-img", AuthService.uploadImgUser);

module.exports = router;
