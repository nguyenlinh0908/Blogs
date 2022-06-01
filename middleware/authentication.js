const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const verifyToken = async (req, res, next) => {
  let bearToken = req.headers.authorization;
  let token = bearToken.split(" ")[1];
  if (token) {
    try {
      let verifyData = jwt.verify(token, process.env.SECRET_KEY);
      res.locals.session = verifyData;
      next();
    } catch (err) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ status: "fail", errors: err });
    }
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ status: "fail", errors: "unauthorized" });
  }
};

module.exports = {
  verifyToken,
};
