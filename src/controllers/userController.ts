import ErrorHandler from "./../models/ErrorHandler";
class userController {
  defaultMethod() {
    throw new ErrorHandler(501, "Not implemented method");
  }

  getUsersMethod() {
    return "GET USERS";
  }

  getUsersByIdMethod(id: string) {
    return "GET USERS BY ID";
  }

  postNewUser() {
    return "POST NEW USER";
  }

  updateUser(id: string) {
    return "UPDATE USER";
  }

  deleteUser(id: string) {
    return "DELETE USER";
  }
}

export = new userController();
