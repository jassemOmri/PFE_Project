const jwt = require("jsonwebtoken");
const SECRET_KEY =  "mysecretkey";

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  
  if (!token) {
    return res.status(403).json({ success: false, message: "Accès refusé. Aucun token fourni." });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Token invalide." });
    }
    req.user = decoded;
    next();
  });
};
