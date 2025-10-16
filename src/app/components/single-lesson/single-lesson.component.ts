//יש לך בעיות עם הדף הזה? אני אשמח אם תוכלי להסתיר אותו ולא לשנות בו דברים 
//הוא עוד לא סופי ויתכן ויהיו בו בעיות

import { Component, Input } from '@angular/core';
import { Training } from '../../Models/Training.model';
import { FormControl, NgModel } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Time } from '../../Models/Time.model';
import { InputTextModule } from 'primeng/inputtext';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { Trainer } from 'src/app/Models/trainer.model';
import { TrainingType } from 'src/app/Models/trainingType.model';
import { TrainerService } from 'src/app/Services/trainers.service';
import { TrainingTypeService } from 'src/app/Services/trainingType.service';
import { TrainingService } from 'src/app/Services/training.servisec';
import { Title } from '@angular/platform-browser';
import { Action } from 'rxjs/internal/scheduler/Action';
import { TrainingCustomerType } from 'src/app/Models/trainingCustomerType.model';
import { TrainingCustomerTypeService } from 'src/app/Services/trainingCustomerType.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainingPostDTO } from 'src/app/Models/trainingPostDTO.model';
@Component({
  selector: 'app-single-lesson',
  templateUrl: './single-lesson.component.html',
  styleUrls: ['./single-lesson.component.scss']
})
export class SingleLessonComponent {
  @Input() id: number = 1;
  thistrain: Training = new Training(0, 0, 0, 1, " ", "0", "0", " ", " ", " ", 0, true);
  alltrainer: Trainer[] = [];
  toedit: boolean = false;
  alltrainingCustomerType: TrainingCustomerType[] = [];
  alltrainingType = [{ title: "fhsd", code: 544 }, { title: "poiu", code: 3653 }];
  selectedValue: number = 0; // משתנה חדש לאחסון הערך שנבחר ב־<select>
  trainingpost: TrainingPostDTO = new TrainingPostDTO(" ", " ", 0, 0, 0, 0);

  myForm: FormGroup;

  ngOnInit() {

    //TrainingCustomerType מערך של כל הדברים מטבלה
    this._trainingCustomerTypeService.getTrainingCustomerTypeFromServer().subscribe(
      action => { this.alltrainingCustomerType = action; },
      error => { console.error("Error fetching training customer types: ", error); }
    );
    this._trainerService.getTrainerFromServer().subscribe(
      action => { this.alltrainer = action }
    );
    if (this.id != 0) {//בדיקה שהאימון קיים
      this._trainingService.getTrainingById(this.id).subscribe(
        action => { this.thistrain = action; },
      );
    }
  }
  edit() {
    this.toedit = true;
  }
  delete(){
    this.thistrain.isActive=false;
    this._trainingService.UpdateTrainingById(this.id,this.thistrain).subscribe();
  }
  numberRangeValidatorday(control: FormControl): { [key: string]: boolean } | null {
    if (control.value !== null && (isNaN(control.value) || control.value < 1 || control.value > 6)) {
      return { 'invalidNumberRange': true };
    }
    return null;
  }
  numberRangeValidator(control: FormControl): { [key: string]: boolean } | null {
    if (control.value !== null && (isNaN(control.value) || control.value < 1 || control.value > 6)) {
      return { 'invalidNumberRange': true };
    }
    return null;
  }
  selectedTrainingType: any;
  onTrainingTypeSelect(event: any) {
    this.selectedTrainingType = event.value;
  }
  constructor(private _trainingService: TrainingService, private _trainingTypeService: TrainingTypeService,
    private _trainerService: TrainerService, private _trainingCustomerTypeService: TrainingCustomerTypeService, private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      trainingCustomerTypeId: new FormControl('', Validators.required),
      trainerID: ['', Validators.required],
      dayOfWeek: new FormControl('', Validators.required),
      hour: ['', [Validators.required, Validators.min(1), Validators.max(24)]],
      minute: ['', [Validators.required, Validators.min(0), Validators.max(59)]],
      participantsCount: ['', Validators.required]
    });


  }

  convertNumberToString(value: string): number {
    return parseInt(value, 10);
  }
  TrainerSelectedOption(event: any): void {
    const selectedValue = event.target['value'];
    this.thistrain.trainerID = selectedValue;
    this.alltrainer.forEach(item => {
      if (item.id == selectedValue) {
        this.thistrain.trainerName = item.firstName + ' ' + item.lastName
      }
    })
  }
  saveChanges(flag: number) {
    if (flag != 0) {
      console.log("hhhhhoooouuuuurrrrr " + typeof (this.thistrain.hour));
      this._trainingService.UpdateTrainingById(this.id, this.thistrain).subscribe(
        response => {  },
        error => { if (error.status === 500) { console.log("500"); } }
      )
    }
    else {
      this.trainingpost.hour = this.thistrain.hour;
      this.trainingpost.minute = this.thistrain.minute;
      this.trainingpost.trainerID = this.thistrain.trainerID;
      this.trainingpost.dayOfWeek = this.thistrain.dayOfWeek;
      this.trainingpost.trainingCustomerTypeId = this.thistrain.trainingCustomerTypeId;
      this.trainingpost.ParticipantsCount = this.thistrain.participantsCount;
this.thistrain.isActive=true;
      this._trainingService.addTraining(this.trainingpost).subscribe(response => {
       
      },
        error => {
          console.error('An error occurred:', error);        }
      )
    }
    this.toedit=false;
  }
}