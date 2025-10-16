import { Time } from "./Time.model";

export class Training {
    id: number;
    trainingCustomerTypeID: number;
    trainerID: number;
    dayOfWeek: number;
    time: Time = { hour: 0, minute: 0 };
    participantsCount: number;
    isActive: boolean;
    constructor(
        id: number,
        trainingCustomerTypeID: number,
        trainerID: number,
        dayOfWeek: number,
        time: Time,
        participantsCount: number,
        isActive: boolean
    ) {
        this.id = id;
        this.trainingCustomerTypeID =trainingCustomerTypeID;
        this.trainerID =trainerID;
        this.dayOfWeek= dayOfWeek;
        this.time= time;
        this.participantsCount= participantsCount;
        this.isActive= isActive;
    }
}