export class Trainer {
    id: number;
    firstName: string;
    lastName: string;
    mail: string;
    tel: string;
    address: string;
    constructor(
      id: number,
      firstName: string,
      lastName: string,
      mail: string,
      tel: string,
      address: string
    ) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.mail = mail;
      this.tel = tel;
      this.address = address;
    }
  }
  