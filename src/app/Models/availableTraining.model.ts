export class AvailableTraining {
    id: number;
    trainingId: number;
    date: Date;
    participantsCount: number;
    isActive: boolean;
  
    constructor(
      id: number,
      trainingId: number,
      date: Date,
      participantsCount: number,
      isActive: boolean
    ) {
      this.id = id;
      this.trainingId = trainingId;
      this.date = date;
      this.participantsCount = participantsCount;
      this.isActive = isActive;
    }
  }
  