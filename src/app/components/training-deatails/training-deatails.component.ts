import { Component, Input } from '@angular/core';
import { CalanderAvailableTraining } from 'src/app/Models/calanderAvailableTraining.model';

@Component({
  selector: 'app-training-deatails',
  templateUrl: './training-deatails.component.html',
  styleUrls: ['./training-deatails.component.scss']
})
export class TrainingDeatailsComponent {

  @Input() training!: CalanderAvailableTraining;
  
  // Method to calculate the end time
  calculateEndTime(startTime: string): string {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes);

    // Add 45 minutes to the start time
    const endDate = new Date(startDate.getTime() + 45 * 60000);

    // Format the end time as HH:mm
    return `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
  }
}
