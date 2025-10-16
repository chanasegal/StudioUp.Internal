import { Time } from "./Time.model";

export class CalanderAvailableTraining {
    id: number;
    trainingId: number;
    trainerName: string;
    date: Date; 
    dayOfWeek: number;
    time: string;
    customerTypeName: string;
    trainingTypeName: string;
    participantsCount: number = 0;
    isActive: boolean;
  
    constructor(
      id: number,
      trainingId: number,
      trainerName: string,
      date: Date,
      dayOfWeek: number,
      time: string,
      customerTypeName: string,
      trainingTypeName: string,
      participantsCount: number = 0,
      isActive: boolean
    ) {
      this.id = id;
      this.trainingId = trainingId;
      this.trainerName = trainerName;
      this.date = date;
      this.dayOfWeek = dayOfWeek;
      this.time = time;
      this.customerTypeName = customerTypeName;
      this.trainingTypeName = trainingTypeName;
      this.participantsCount = participantsCount;
      this.isActive = isActive;
    }
  }
  