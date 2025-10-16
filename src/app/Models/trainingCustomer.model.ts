
export class TrainingCustomer {
    id: number;
    trainingID: number;
    customerID: number;
    attended: boolean;
    isActive: boolean;
  
    constructor(
      id: number,
      trainingID: number,
      customerID: number,
      attended: boolean,
      isActive: boolean
    ) {
      this.id = id;
      this.trainingID = trainingID;
      this.customerID = customerID;
      this.attended = attended;
      this.isActive = isActive;
    }
  }
  