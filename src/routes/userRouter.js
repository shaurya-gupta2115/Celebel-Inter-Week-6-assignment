// routes/UserRoutes.js
const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const {
  register,
  userInfo,
  update,
  deleteUser,
  login,
  getAllUsers,
  getUserById,
} = require("../controllers/userAuthent");
const userMiddleware  = require("../middleware/userMiddleware")


// CREATE
// userRouter.post("/register", register);
// userRouter.post("/login", login);

// // READ
// userRouter.get("/info",userMiddleware, userInfo);

// // update 
// userRouter.put("/update/:id",userMiddleware,update);

// // DELETE
// userRouter.delete("/deleteUser/:id",userMiddleware,deleteUser);



userRouter.post("/register", register);
userRouter.get("/all", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", update);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;