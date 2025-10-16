

export class TrainingPostDTO {
  trainerID: number;
  dayOfWeek: number;
  hour: string;
  minute: string;
  trainingCustomerTypeId: number;
  ParticipantsCount: number;
  isActive:boolean=true;
  constructor(
    hour: string,
    minute: string,
    trainerID: number,
    DayOfWeek: number,
    TrainingCustomerTypeId: number,
    ParticipantsCount: number,
  ) {
    this.hour = hour;
    this.minute = minute;
    this.dayOfWeek = DayOfWeek;
    this.ParticipantsCount = ParticipantsCount;
    this.trainerID = trainerID;
    this.trainingCustomerTypeId = TrainingCustomerTypeId;
  }
}



