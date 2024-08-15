module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/createUser", users.createUser);
    router.post("/signInUser", users.signIn);
  
  
    app.use("/api/users", router);
};