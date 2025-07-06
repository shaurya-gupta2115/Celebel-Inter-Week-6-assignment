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
userRouter.put("/:id",userMiddleware, update); // updation can only be performed by the user only 
userRouter.delete("/:id",userMiddleware,deleteUser); // only user has the power to delete himself

module.exports = userRouter;