export class SubscriptionType {

    constructor(
        public id: number,
        public title: string,
        public isActive: boolean,
        public totalTraining: number,
        public priceForTraining: number,
        public numberOfTrainingPerWeek:number,
        public description: string,
    ) { }

}

