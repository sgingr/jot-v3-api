const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  if(req.path == '/register' || req.path == '/login') {
    return next();
  }

  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    console.log('req.user');
    console.log(req.user);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
