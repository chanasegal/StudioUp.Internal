import { Component, OnInit } from '@angular/core';
import { Trainer } from '../../Models/trainer.model';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { TrainerService } from '../../Services/trainers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-trainers-list',
  templateUrl: './trainers-list.component.html',
  styleUrls: ['./trainers-list.component.scss']
})
export class TrainersListComponent implements OnInit {

  trainers: Trainer[] = [];
  displayedTrainers: Trainer[] = [];
  selectedTrainerId?: number;
  showAddTrainerDialog: boolean=false;
  myForm!: FormGroup;

  private searchTerms = new Subject<{ firstName: string, lastName: string, mail: string }>();
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private _trainerService: TrainerService,
     private _router: Router,
      private fb: FormBuilder 
    ) {
      this.myForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        tel: [''],
        email: ['', [Validators.required, Validators.email]],
        address: ['']
      });
    }

ngOnInit(): void {
    this.setupSearch();
    this.loadTrainers();
  }

  setupSearch() {
    this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(({ firstName, lastName, mail }) => {
        return this._trainerService.filterTrainers(firstName, lastName, mail);
      })
    ).subscribe(data => {
      this.trainers = data;
      this.currentPage = 1;
      this.updateDisplayedTrainers();
  
    });
  }
  
  loadTrainers(): void {
    this._trainerService.getTrainerFromServer().subscribe(trainers => {
      this.trainers = trainers;
      this.updateDisplayedTrainers();
    });
  }
  updateDisplayedTrainers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedTrainers = this.trainers.slice(startIndex, endIndex);
  }

  
closeAddTrainerDialog() {
this.showAddTrainerDialog=false;
}


  navigateToAddTrainer(): void {
    this.showAddTrainerDialog = true;
  }

  filterBySearch(name: string, mail: string): void {
   
    const nameParts = name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || ''; 

    this.searchTerms.next({ firstName, lastName, mail });
    
  }




  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.trainers.length) {
      this.currentPage++;
      this.updateDisplayedTrainers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedTrainers();
    }
  }

  selectTrainer(trainerId: number): void {
    this.selectedTrainerId = trainerId;
  }




  addTrainer() {

    const controls = this.myForm.controls;
    const trainer: Trainer = {
      id: 0,
      firstName: controls['firstName'].value,
      lastName: controls['lastName'].value,
      mail: controls['email'].value,
      tel: controls['tel'].value,
      address: controls['address'].value
    };

 
   this._trainerService.addTrainer(trainer).subscribe(data => {
          location.reload();
        });
  
  }
}
