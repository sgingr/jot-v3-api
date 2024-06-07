const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  if(req.path == '/register' || req.path == '/login') {
    return next();
  }

  const token = req.cookies.session;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    console.log('TOKEN=' + process.env.TOKEN_KEY);
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
