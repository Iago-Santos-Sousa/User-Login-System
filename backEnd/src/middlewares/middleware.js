const jwt = require("jsonwebtoken");

// Lista de endpoint sem autenticação
const unsecuredRoutes = ["/login"];

const authenticateToken = (req, res, next) => {
  const el = unsecuredRoutes.find((a) => req.path.includes(a));

  if (el) {
    // Se for uma rota que não precisa de autenticação passa o controle para a próxima rota
    next();
    return;
  }

  const authHeader = req.headers["authorization"]; // Recebe o token do cabeçalho
  const token = authHeader && authHeader.split(" ")[1]; // Recebe o token do cabeçalho

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  // Faz a verificação do token recebido no cabeçalho
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    console.log({ decode });
    if (err) {
      return res.status(404).json({ message: "Usuário não autorizado!" });
    }

    // Se for válido coloca o token decodificado na request
    req.user = decode;
    next();
  });
};

module.exports = authenticateToken;
