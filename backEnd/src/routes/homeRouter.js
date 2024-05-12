const router = require("express").Router();
const AuthService = require("../services/Users");

router.get("/", AuthService.getUsers);

module.exports = router;
