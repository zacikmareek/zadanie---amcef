const AuthenticationController = require("../controllers/AuthenticationController");
const UsersController = require("../controllers/UsersController");

module.exports = (app) => {
  /******** LOGIN REGISTER LOGOUT ********/
  app.post("/api/register", AuthenticationController.register);

  app.post("/api/login", AuthenticationController.login);

  app.get("/api/logout", AuthenticationController.logout);

  /******** USERS MANAGEMENT ********/
  app.get("/api/users/:page/get/:limit", UsersController.getAllUsers);

  app.get("/api/users/:id/get", UsersController.getSpecificUserById);

  app.put("/api/users/:id/edit", UsersController.updateUser);

  app.delete("/api/users/:id/delete", UsersController.deleteUser);
};
