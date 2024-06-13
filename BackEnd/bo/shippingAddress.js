class ShippingAddress{
    constructor(
        ShippingAddressID,
        Receiver,
        PhoneNumber,
        Address,
        UserID
    ){
      this.ShippingAddressID = ShippingAddressID;
      this.Receiver = Receiver;
      this.PhoneNumber = PhoneNumber;
      this.Address = Address;
      this.UserID = UserID;

    }
}

module.exports = ShippingAddress;