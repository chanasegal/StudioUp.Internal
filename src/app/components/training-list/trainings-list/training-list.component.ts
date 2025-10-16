
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerTrainingsDeatailsService } from 'src/app/Services/customerTrainingsDeatails.service';
import { Training } from 'src/app/Models/Training.model';
import { TrainingService } from 'src/app/Services/training.servisec';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss']
})
export class TrainingListComponent implements OnInit {
  allTrainings!: Training[];
  addTraining!: boolean;
  selectedTrainingId?: number;
  currentPage = 1;
  itemsPerPage = 3;
  calanderAT: Training[] = [];
  displayedcalanderAT: Training[] = [];
  showAddTrainingDialog: boolean = true;

  filterForm: FormGroup;

  constructor(
    private _trainingService: TrainingService,
    private _router: Router,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      date1: [null],
      date2: [null],
      past: [false],
      future: [false]
    });
  }

  ngOnInit(): void {
    this.loadTrainings();
    this.setupSearch();
    this._trainingService.getTrainingFromServer().subscribe(
      action => {
        action.forEach(item => {
          if(item.isActive){
          this.allTrainings.push(item);
          }

        });
      }
    )
  }
  navigateToAddTraining(): void {
    //this._router.navigate(['/add-customer']);
    this.addTraining = true

  }

  closeAddTrainingDialog() {
    this.showAddTrainingDialog = false;
  }
  setupSearch(): void {
    this.filterForm.valueChanges.subscribe(values => {
      console.log('Filter values:', values);  // Debug log
    });
  }

  loadTrainings(): void {
    this._trainingService.getTrainingFromServer().subscribe(details => {
      console.log('Loaded trainings:', details);  // Debug log
      this.calanderAT = details;
      this.updateDisplayedTrainings();
    });
  }

  updateDisplayedTrainings(): void {
    // const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    // const endIndex = startIndex + this.itemsPerPage;
    // this.displayedcalanderAT = this.calanderAT.slice(startIndex, endIndex);
    this.displayedcalanderAT = this.calanderAT;

  }

  
  selectTraining(id: number): void {
    this.selectedTrainingId = id;
  }

}