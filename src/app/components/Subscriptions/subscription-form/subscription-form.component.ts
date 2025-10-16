import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubscriptionType } from 'src/app/Models/SubscriptionType';
import { SubscriptionService } from 'src/app/Services/SubscriptionService';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class SubscriptionFormComponent implements OnInit, OnChanges {

  @Input() actionType: string = '';
  @Input() currentSubId!: number;
  @Output() loadChanges: EventEmitter<boolean> = new EventEmitter<boolean>();

  subscriptionForm!: FormGroup;
  lstSubs: SubscriptionType[] = [];
  subToDisplay: SubscriptionType | undefined;
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
  constructor(private subscriptionService: SubscriptionService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadSubscriptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['actionType'] && this.actionType === 'update' || this.actionType === 'add')
      this.visible = true;
    if (changes['actionType'] && this.actionType === 'update' ) {
      this.updateFormWithCurrentSubscription();
    }
  }

  private initializeForm(): void {
    this.subscriptionForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      numberOfTrainingPerWeek: new FormControl('', [Validators.required]),
      totalTraining: new FormControl('', [Validators.required]),
      priceForTraining: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  private loadSubscriptions(): void {
    this.subscriptionService.obsSubscriptions.subscribe(
      (data: SubscriptionType[]) => {
        this.lstSubs = data;
      },
      (error) => {
        console.error('Error fetching subscriptions:', error);
      }
    );
  }

  private updateFormWithCurrentSubscription(): void {
    console.log('going to update: ',this.currentSubId);
    this.subToDisplay = this.lstSubs.find(x => x.id == this.currentSubId);
    if (this.subToDisplay) {
      this.subscriptionForm.patchValue(this.subToDisplay);
    } else {
      console.warn('No subscription found with the provided id:', this.currentSubId);
    }
  }

  saveDetails(): void {
    
    const formValue: Partial<SubscriptionType> = this.subscriptionForm.value;
    const subscription = { ...formValue, isActive: true } as SubscriptionType;

    switch (this.actionType) {
      case 'add':
        this.addSubscription(subscription);
        break;
      case 'update':
        this.updateSubscription(subscription);
        break;
      default:
        console.warn('Unknown action');
    }
    this.cancleAction();
    this.loadSubscriptions();
  }

  private addSubscription(subscription: SubscriptionType): void {
    this.subscriptionService.addNewSubscription(subscription).subscribe({
      next: res => {
        console.log('Add response:', res);
      },
      error: err => {
        console.error('Add error:', err);
      }
    });
  }

  private updateSubscription(subscription: SubscriptionType): void {
    if (!this.subToDisplay) {
      console.warn('No subscription found to update.');
      return;
    }
    subscription.id=this.currentSubId;
    this.subscriptionService.updateSubscription(subscription).subscribe({
      next: res => {
        console.log('Update response:', res);
      },
      error: err => {
        console.error('Update error:', err);
      }
    });
  }

  cancleAction():void{
    this.subscriptionForm.reset();
    this.actionType='';
    this.currentSubId=0;
    this.loadChanges.emit(true);
  }

}
