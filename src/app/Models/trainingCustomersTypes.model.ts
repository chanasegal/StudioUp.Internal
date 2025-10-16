export class trainingCustomersTypes {
    id?: number
    customerTypeID?: number
    trainingTypeID?: number
    isActive?: boolean
    trainingCustomerName?:string

    constructor(id: number,
        customerTypeID: number,
        trainingTypeID: number,
        isActive: boolean) {

        this.id = id;
        this.customerTypeID = customerTypeID;
        this.trainingTypeID = trainingTypeID;
        this.isActive = isActive;
    }
}