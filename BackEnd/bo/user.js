class User {
    constructor(UserID, UserName, PhoneNumber, Mail, Password, RoleID) {
      this.UserID = UserID;
      this.UserName = UserName;
      this.PhoneNumber = PhoneNumber;
      this.Password = Password;
      this.Mail = Mail;
      this.RoleID = RoleID;
    };
  }
  module.exports = User;
  