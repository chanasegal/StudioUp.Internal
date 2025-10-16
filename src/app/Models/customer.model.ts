export class Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string
  customerTypeId?: number;
  hmoId?: number;
  paymentOptionId?: number;
  subscriptionTypeId?: number;
  isActive?: boolean;
  tel?: string;
  address?: string;
  tz?:string
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    customerTypeId: number,
    HMOId: number,
    paymentOptionId: number,
    subscriptionTypeId: number,
    isActive: boolean,
    tel: string,
    address: string,
    tz:string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email
    this.customerTypeId = customerTypeId;
    this.hmoId = HMOId;
    this.paymentOptionId = paymentOptionId;
    this.subscriptionTypeId = subscriptionTypeId;
    this.isActive = isActive;
    this.tel = tel;
    this.address = address;
    this.tz = tz
  }
}
