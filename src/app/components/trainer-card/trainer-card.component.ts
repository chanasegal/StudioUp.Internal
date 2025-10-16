import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabViewModule } from 'primeng/tabview';
import { TrainerService } from '../../Services/trainers.service';
import { Trainer } from 'src/app/Models/trainer.model';

@Component({
  selector: 'app-trainer-card',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SelectButtonModule, TabViewModule],
  templateUrl: './trainer-card.component.html',
  styleUrls: ['./trainer-card.component.scss']
})
export class TrainerCardComponent implements OnInit {
  myForm: FormGroup;
  toedit: boolean = true;
  currentTrainer?: Trainer;

  @Input() trainerId?: number;

  constructor(
    private trainerService: TrainerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.myForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Zא-ת]*$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Zא-ת]*$')]),
      tel: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      address: new FormControl('', Validators.required),
      mail: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit() {
    if (this.trainerId) {
      this.getTrainer(this.trainerId);
      this.toedit = false;
    } else {
      this.toedit = true;
    }
  }

  getTrainer(trainerId: number) {
    this.trainerService.getTrainerById(trainerId).subscribe(data => {
      this.currentTrainer = data;
      this.myForm.patchValue({
        firstName: this.currentTrainer?.firstName,
        lastName: this.currentTrainer?.lastName,
  
        tel: this.currentTrainer?.tel,
        address: this.currentTrainer?.address,
        mail: this.currentTrainer?.mail
      });
    });
  }

  edit() {
    this.toedit = true;
  }

  saveChanges() {
    if (this.myForm.valid) {
      const controls = this.myForm.controls;
      const trainer: Trainer = {
        id: this.currentTrainer?.id ?? 0,
        firstName: controls['firstName'].value,
        lastName: controls['lastName'].value,
        mail: controls['mail'].value,
        tel: controls['tel'].value,
        address: controls['address'].value
      };

      if (this.trainerId !== undefined) {
        this.trainerService.updateTrainer(trainer).subscribe(data => {
          this.getTrainer(this.trainerId!);
          this.toedit = false;
        });
      } else {
        this.trainerService.addTrainer(trainer).subscribe(data => {
          location.reload();
        });
      }
    }
  }
}
