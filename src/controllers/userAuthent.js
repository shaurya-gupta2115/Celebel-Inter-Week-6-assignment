// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const validate = require("../utils/validator")

// const userInfo = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     if (!userId) return res.status(400).send("User ID is Missing");

//     const user = await User.findById(userId).select("_id firstName emailId ");

//     if (!user) return res.status(404).send("User Not Found");

//     res.status(200).json({ user }); // ✅ Properly send user info back to frontend
//   } catch (error) {
//     res.status(500).send("Internal Server Error");
//   }
// };

// const register = async (req, res) => {

//   console.log(">>> /register HIT");
//   console.log("Request body:", req.body);
  
//   try {
//     // validate the data;
//     validate(req.body);
//     const { firstName, emailId, password } = req.body;

//     req.body.password = await bcrypt.hash(password, 10);
//     const user = await User.create(req.body);

//     const token = jwt.sign(
//       { _id: user._id, emailId: emailId },
//       process.env.JWT_KEY,
//       { expiresIn: 60 * 60 }
//     );
//     res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
//     res.status(201).json({ user });
//   } catch (err) {
//     res.status(400).send("Error: " + err);
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { emailId, password } = req.body;

//     if (!emailId) throw new Error("Invalid Credentials");
//     if (!password) throw new Error("Invalid Credentials");

//     const user = await User.findOne({ emailId });

//     const match = await bcrypt.compare(password, user.password);

//     if (!match) throw new Error("Invalid Credentials");

//     //when a user do login, the new token is generated and that token is to be placed in the cookie for futher availability
//     const token = jwt.sign(
//       { _id: user._id, emailId: emailId },
//       process.env.JWT_KEY,
//       { expiresIn: 60 * 60 }
//     );

//     res.cookie("token", token, { maxAge: 60 * 60 * 1000 }); //cookies ki place se bhi to token hatana tha after certain time

//     res.status(200).json({ user });
//   } catch (err) {
//     res.status(401).send("Error: " + err);
//   }
// };

// // logOut feature

// const logout = async (req, res) => {
//   try {
//     const { token } = req.cookies;
//     const payload = jwt.decode(token);

//     //    Cookies ko clear kar dena.....
//     res.cookie("token", null, { expires: new Date(Date.now()) });
//     res.send("Logged Out Succesfully");
//   } catch (err) {
//     res.status(503).send("Error: " + err);
//   }
// };

// const update =  async (req, res) => {
//   try {
//     const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json(updated);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// const deleteUser = async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.json({ message: "User deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// module.exports = {
//   userInfo,
//   register,
//   login,
//   logout,
//   deleteUser,
//   update
// };


const User = require("../models/user");

// CREATE
const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// UPDATE
const update = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  getAllUsers,
  getUserById,
  update,
  deleteUser,
};