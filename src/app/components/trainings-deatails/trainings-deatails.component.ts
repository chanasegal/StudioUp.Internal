import { Component, Input } from '@angular/core';
import { Training } from 'src/app/Models/Training.model';

@Component({
  selector: 'app-trainings-deatails',
  templateUrl: './trainings-deatails.component.html',
  styleUrls: ['./trainings-deatails.component.scss']
})
export class TrainingsDeatailsComponent {

  @Input() training!: Training;
  
}
