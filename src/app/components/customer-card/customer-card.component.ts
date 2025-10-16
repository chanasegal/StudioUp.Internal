
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { Customer } from 'src/app/Models/customer.model';
import { CustomerService } from 'src/app/Services/customers.service';
import { CustomerTypeService } from 'src/app/Services/customerType.service';
import { PaymentOptionService } from 'src/app/Services/paymentOption.service';
import { SubscriptionTypeService } from 'src/app/Services/subscriptionType.service';
import { HMOService } from 'src/app/Services/HMO.service';
import { TrainingCustomerService } from 'src/app/Services/trainingCustomer.service';
import { TrainingService } from 'src/app/Services/trainig.servisec';
import { TrainerService } from 'src/app/Services/trainers.service';
import { AvailableTrainingService } from 'src/app/Services/availableTraining.service';
import { CalanderAvailableTraining } from 'src/app/Models/calanderAvailableTraining.model';
import { PaymentOption } from 'src/app/Models/paymentOption.model';
import { CustomerType } from 'src/app/Models/customerType.model';
import { HMO } from 'src/app/Models/HMO.model';
import { SubscriptionType } from 'src/app/Models/subscriptionType.model';
import { TrainingCustomer } from 'src/app/Models/trainingCustomer.model';

@Component({
  selector: 'app-customer-card',
  standalone: true,
  imports: [FormsModule, TabViewModule, CommonModule, ReactiveFormsModule, SelectButtonModule],
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss']
})
export class CustomerCardComponent {
  paymentOptions!: PaymentOption[];
  subscriptionType: SubscriptionType[] = [];
  customersType: CustomerType[] = [];
  allHMO: HMO[] = [];
  trainings: CalanderAvailableTraining[] = [];
  trainingCustomers: TrainingCustomer[] = [];
  paginatedTrainings: CalanderAvailableTraining[] = [];
  currentPage: number = 0;
  pageSize: number = 6;
  totalPages: number = 0;

  myForm: FormGroup;
  toedit: boolean = true;
  currentCustomer?: Customer;
  currentTraining: CalanderAvailableTraining | null = null;
  currentTrainingIndex: number = 0;
  stateOptions: any[] = [{ label: 'לא פעיל', value: false }, { label: 'פעיל', value: true }];
  @Input() custId?: number;

  constructor(
    private customerService: CustomerService,
    private paymentOptionService: PaymentOptionService,
    private customerTypeService: CustomerTypeService,
    private subscriptionTypeService: SubscriptionTypeService,
    private trainingCustomerService: TrainingCustomerService,
    private HMOService: HMOService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.myForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Zא-ת]*$')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Zא-ת]*$')]),
      customerTypeId: new FormControl('', Validators.required),
      hmoId: new FormControl('', Validators.required),
      paymentOptionId: new FormControl('', Validators.required),
      subscriptionTypeId: new FormControl('', Validators.required),
      isActive: new FormControl('', Validators.required),
      tel: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      address: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      tz: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
    });
  }

  ngOnInit() {
    console.log('ngOnInit called');

    if (this.custId) {
      this.getCust(this.custId);
      this.toedit = false;
    } else {
      this.toedit = true;
    }
    this.paymentOptionService.getAllPaymentOption().subscribe(data => {
      this.paymentOptions = data;
    });
    this.customerTypeService.getAllCustomerType().subscribe(data => {
      this.customersType = data;
    });
    this.subscriptionTypeService.getAllSubscriptionType().subscribe(data => {
      this.subscriptionType = data;
    });
    this.HMOService.getAllHMO().subscribe(data => {
      this.allHMO = data;
    });
  }

  getCust(custId: number) {
    this.customerService.getCustomerById(custId).subscribe(data => {
      this.currentCustomer = data;
      this.loadTrainings(custId);
    });
  }

  
  
  loadTrainings(customerId: number) {
    this.trainingCustomerService.getAllRegisteredTrainingsDetails().subscribe(trainings => {
      // this.trainings = trainings.sort((a, b) => {
      //   const dateA = new Date(a.date);
      //   const dateB = new Date(b.date);
      //   return dateB.getTime() - dateA.getTime();
      // });
      const currentDate = new Date(); // התאריך הנוכחי

      this.trainings = trainings.filter(training => new Date(training.date) < currentDate)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      this.totalPages = Math.ceil(this.trainings.length / this.pageSize);
      this.updatePaginatedTrainings();

      if (this.trainings.length > 0) {
        this.currentTraining = this.trainings[0];
      }

      this.trainingCustomerService.getTrainingByCustomerId(customerId).subscribe(trainingCustomers => {
        this.trainingCustomers = trainingCustomers;
      }, error => {
        console.error("Error fetching training attendance:", error);
      });
    }, error => {
      console.error("Error fetching customer trainings:", error);
    });
  }

  updatePaginatedTrainings() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTrainings = this.trainings.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePaginatedTrainings();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedTrainings();
    }
  }


  getAttendance(trainingId: number): boolean {
    const attendanceRecord = this.trainingCustomers.find(tc => tc.trainingID === trainingId);
    return attendanceRecord ? attendanceRecord.attended : false;
  }
  
  
  edit() {
    this.toedit = true;
    let val = this.currentCustomer?.isActive === true ? true : false;
    this.myForm.get('isActive')?.setValue(val);
  }

  saveChanges() {

    if (this.myForm.valid) {
      const { controls } = this.myForm;
      let cust: Customer = new Customer(
        0,
        controls['firstName'].value,
        controls['lastName'].value,
        controls['email'].value,
        controls['customerTypeId'].value,
        controls['hmoId'].value,
        controls['paymentOptionId'].value,
        controls['subscriptionTypeId'].value,
        controls['isActive'].value,
        controls['tel'].value,
        controls['address'].value,
        controls['tz'].value,
      );
      console.log({cust});
      
      if (this.custId != undefined) {
        if (this.currentCustomer?.id) { 
          cust.id = this.currentCustomer?.id; 
        }
        this.customerService.updateCustomer(cust).subscribe(data => {
          console.log({data});
          
          if (this.currentCustomer?.id) {
            this.getCust(this.currentCustomer.id);
            this.toedit = false;
            if(cust.isActive==false)
              location.reload();
          }
        });
      } else {
        console.log("add", cust);
        this.customerService.addCustomer(cust).subscribe(data => {
          console.log({ data });
          location.reload();
        });
      }
    }
  }

  nextTraining() {
    if (this.currentTrainingIndex < this.trainings.length - 1) {
      this.currentTrainingIndex++;
      this.currentTraining = this.trainings[this.currentTrainingIndex];
    }
  }

  prevTraining() {
    if (this.currentTrainingIndex > 0) {
      this.currentTrainingIndex--;
      this.currentTraining = this.trainings[this.currentTrainingIndex];
    }
  }
}

