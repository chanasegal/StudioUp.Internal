import { Training } from "./Training.model";

export interface TrainingDetails extends Training {
    trainerName?: string;
    trainingDate?: Date;
}