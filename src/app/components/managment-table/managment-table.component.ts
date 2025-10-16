import { Component } from '@angular/core';
import { CustomerTypeService } from '../../Services/customerType.service';
import { Router } from '@angular/router';
import { CustomerType } from '../../Models/customerType.model';
import { TrainingType } from '../../Models/trainingType.model';
import { PaymentOption } from '../../Models/paymentOption.model';
import { TrainingTypeService } from '../../Services/trainingType.service';
import { PaymentOptionService } from '../../Services/paymentOption.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TrainingCustomerService } from '../../Services/trainingCustomer.service';
import { TrainingCustomer } from '../../Models/trainingCustomer.model';
import { TrainingCustomersTypesService } from '../../Services/training-customers-types.service';
import { trainingCustomersTypes } from '../../Models/trainingCustomersTypes.model';
import { internalHomeLinks } from 'src/app/Models/InternalHomeLinks';
import { InternalHomeLinksServiceTsService } from 'src/app/Services/internal-home-links.service';
@Component({
  selector: 'app-managment-table',
  templateUrl: './managment-table.component.html',
  styleUrls: ['./managment-table.component.scss']
})

export class ManagmentTableComponent {
  myForm: FormGroup
  custType: CustomerType[] | undefined;
  trainType: TrainingType[] | undefined;
  paymOptions: PaymentOption[] | undefined;
  trainingCustomerTypes: trainingCustomersTypes[] | undefined;
  internalHomeLinks:internalHomeLinks[]|undefined;
  isEdit: boolean = false;
  isDelete: boolean = false;
  addPo: boolean = false;
  addTr: boolean = false;
  addCType:boolean=false;
  addTC:boolean=false;
  constructor(private customerTypeService: CustomerTypeService, 
    private trainingTypeService: TrainingTypeService, 
    private paymentOptionsService: PaymentOptionService,
     private trainingCustomersTypes: TrainingCustomersTypesService,
    private internalHomeLinksService:InternalHomeLinksServiceTsService) {
    this.myForm = new FormGroup({
      title: new FormControl(''),
      title2:new FormControl(''),
      title3:new FormControl(''),
      title4:new FormControl(''),
      title5:new FormControl(''),
      isActive: new FormControl(''),
      trainingTypeID: new FormControl(''),
      customerTypeID: new FormControl(''),
      link:new FormControl(''),
      isExternal:new FormControl('')
    }),
      //גישה לסוגי מתאמנים
      this.customerTypeService.getAllCustomerType().subscribe(data => {
        this.custType = data
        console.log('custtype', this.custType);

      }),

      // גישה לטבלת סוגי אימונים
      this.trainingTypeService.getAllTrainingType().subscribe(data => {
        this.trainType = data
        console.log('trainingType', this.trainType);

      }),

      // גישה לטבלת אפשרויות תשלום
      this.paymentOptionsService.getAllPaymentOption().subscribe(
        data => {
          this.paymOptions = data;
          console.log('payoption', this.paymOptions);
          // Additional logic with the data received
        }),
//גישה לאימונים למתאמן
      this.trainingCustomersTypes.getAllTC().subscribe(data => {
        this.trainingCustomerTypes = data;
      
      }),
      //גישה ללינקים
      this.internalHomeLinksService.getAllLinks().subscribe(data=>{
        this.internalHomeLinks=data
        console.log('internalHomeLinks',this.internalHomeLinks);
        
      })

  }
  editItemId: number | null = null;

  edit(id: number): void {
    this.editItemId = id;
  }
  cancelEdit(): void {
    this.editItemId = null;
  }
  saveChanges(itemId: number): void {
    const { controls } = this.myForm
    let cusType: CustomerType = {
      id: itemId,
      title: controls['title'].value,
      isActive: true
    }
    this.customerTypeService.updateCustomerType(cusType).subscribe(data => {
      this.myForm.reset()
      location.reload();

    })
  }
  saveChangesForPayment(itemId: number): void {
    console.log("+++++",this.myForm);
    
    const { controls } = this.myForm
    let payOp: PaymentOption = {
      id: itemId,
      title: controls['title3'].value,
      isActive: true
    }
    // console.log({payOp});
    
    this.paymentOptionsService.updatePaymentOption(payOp).subscribe(data => {
      this.myForm.reset();
      location.reload();
    })
  }
  saveChangesForHomeInternalLinks(itemId: number): void {
    const { controls } = this.myForm
    let internalHomeLink: internalHomeLinks = {
      id: itemId,
      title: controls['title4'].value,
      link:controls['link'].value,
      isExternal:controls['isExternal'].value,
      isActive: true
    }   
    this.internalHomeLinksService.updateInternalHomeLinks(internalHomeLink).subscribe(data => {
      this.myForm.reset()
      location.reload();
    })
  }
  saveChangesForTrainingType(itemId: number): void {
    const { controls } = this.myForm
    console.log({controls});

    let trainingType: TrainingType = {
      id: itemId,
      title: controls['title2'].value,
      isActive: true
    }
    this.trainingTypeService.updatetrainType(trainingType).subscribe(data => {
      console.log({trainingType});
      
      this.myForm.reset()
      location.reload();
    })
  }
  saveChangesForTCT(itemId: number): void {
    const { controls } = this.myForm
    console.log({ controls });

    let tct: trainingCustomersTypes = {
      id: itemId,
      customerTypeID: controls['customerTypeID'].value,
      trainingTypeID: controls['trainingTypeID'].value,
      trainingCustomerName:"string",
      isActive: true
    }
    
    this.trainingCustomersTypes.updateTCT(tct).subscribe(data => {
      this.myForm.reset()
      location.reload();
    })

  }
  deleteForCustomerType(id: number) {

    this.customerTypeService.deleteCustomerType(id).subscribe(data => {
      console.log("deleted ctyp", { data })
      this.myForm.reset()
      location.reload();
    })
  }
  delForTrainingType(id: number) {

    this.trainingTypeService.deleteTrainingType(id).subscribe(data => {
      this.myForm.reset()
      location.reload();
    })
  }
  delForPaymentOptions(id: number) {

    this.paymentOptionsService.deletePaymentOptions(id).subscribe(data => {
      this.myForm.reset()
      location.reload();
    })
  }
  delForInternalHomeLinks(id: number) {

    this.internalHomeLinksService.deleteInternalHomeLink(id).subscribe(data => {
      this.myForm.reset()
      location.reload();
    })
  }
  delForTCT(id: number) {
    this.trainingCustomersTypes.deleteTC(id).subscribe(data => {
      this.myForm.reset()
      location.reload();
    })
  }
  addPO() {
    this.addPo = true;
  }
  addPayOP() {

    const controls = this.myForm.controls;
    const payOp: PaymentOption = {
      id: 0,
      title: controls['title'].value,
      isActive: true,

    };


    this.paymentOptionsService.addPaymentOption(payOp).subscribe(data => {
      location.reload();
    });
  }
  addInternalHomeLink() {

    const controls = this.myForm.controls;
    const payOp: internalHomeLinks = {
      id: 0,
      title: controls['title'].value,
      link:controls['link'].value,
      isExternal:controls['isExternal'].value,
      isActive: true,

    };

    this.internalHomeLinksService.addInternalHomeLinks(payOp).subscribe(data => {
      location.reload();
    });
  }
  addTR() {
    this.addTr = true;
  }
  addTrainType() {

    const controls = this.myForm.controls;
    const trT: TrainingType = {
      id: 0,
      title: controls['title'].value,
      isActive: true,
    };
    this.trainingTypeService.addTrainingType(trT).subscribe(data => {
      location.reload();
    });
  }
  addCustType(){
    this.addCType=true;
  }
  addCustomerType(){
    const controls = this.myForm.controls;
    const cust: CustomerType = {
      id: 0,
      title: controls['title'].value,
      isActive: true,
    };
    this.customerTypeService.addCustomerType(cust).subscribe(data => {
      location.reload();
    });

  }
  addTc(){
    this.addTC=true;
  }
  addTrCustType(){
  const controls = this.myForm.controls;
  const tc: trainingCustomersTypes = {
    id: 0,
    trainingTypeID:controls['trainingTypeID'].value,
    customerTypeID:controls['customerTypeID'].value,
    trainingCustomerName:"string",
    isActive:true,
  };
  this.trainingCustomersTypes.addTCT(tc).subscribe(data => {
    location.reload();
  });

}
cancel(){
  location.reload();
}
}


