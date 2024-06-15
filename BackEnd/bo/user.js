class User {
    constructor(
        UserID,
        UserName,
        PhoneNumber,
        Email,
        Password,
        Point,
        Address,
        Status,
        RoleID
     ) {
    this.UserID = UserID;
    this.UserName = UserName;
    this.PhoneNumber = PhoneNumber;
    this.Email = Email;
    this.Password = Password;
    this.Point = Point;
    this.Address = Address;
    this.Status = Status;
    this.RoleID = RoleID;
}
}

module.exports = User;