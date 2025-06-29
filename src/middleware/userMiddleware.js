const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Token is not persent");

    const payload = jwt.verify(token, process.env.JWT_KEY);

    const { _id } = payload;

    if (!_id) {
      throw new Error("Invalid token");
    }

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User Doesn't Exist");
    }

    req.user = user; // we are sending all the information of the user from this userMiddleware

    next(); // this will make us to proceed to move in the next function / controller after executing this function of checks
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
};

module.exports = userMiddleware;
