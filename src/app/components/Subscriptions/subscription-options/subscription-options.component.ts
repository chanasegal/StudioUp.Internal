import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SubscriptionService } from 'src/app/Services/SubscriptionService';
import { SubscriptionType } from 'src/app/Models/SubscriptionType';

@Component({
  selector: 'app-subscription-options',
  templateUrl: './subscription-options.component.html',
  styleUrls: ['./subscription-options.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SubscriptionOptionsComponent {
  cols: string[] = [];
  lstSubs: SubscriptionType[] = [];
  action: string = '';
  currentSubId: number = 0;
  showDeleteMess: boolean = false;

  constructor(private _subscriptionService: SubscriptionService,
              private _confirmationService: ConfirmationService,
            ) { }

  ngOnInit() {
    this.loadSubscriptions();
    this.cols = this._subscriptionService.cols;
  }

  addSubPress(): void {
    this.action = 'add';
  }

  allOptions(rowData: SubscriptionType): object[] {
    return [
      {
        label: 'Update',
        icon: 'pi pi-pencil',
        command: () => {
          this.action = 'update';
          this.saveCurrentId(rowData.id);
          console.log('i press update to id: ', this.currentSubId)
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          this.saveCurrentId(rowData.id);
          this.showDeleteDialog();
        }
      }
    ];
  }

  showDeleteDialog() {
  this._confirmationService.confirm({
    message: 'האם אתה בטוח שברצונך למחוק?',
    header: 'מחיקת מנוי',
    icon: 'pi pi-info-circle',
    acceptLabel: 'מחק',
    rejectLabel: 'בטל',
    defaultFocus: 'reject',
    accept: () => {
      this.deleteSubscription();
    },
    reject: () => {
      this.cancleAction();
    }
  });
}


  saveCurrentId(currentId: number): void {
    this.currentSubId = currentId;
  }

  deleteSubscription(): void {
    this._subscriptionService.deleteSubscription(this.currentSubId).subscribe({
      next: res => {
        this.showDeleteMess = false;
        this.loadSubscriptions();
      },
      error: err => {
        console.error('Delete error:', err);
      }
    });
  }

  loadSubscriptions() {
    this._subscriptionService.obsSubscriptions.subscribe(
      (data: SubscriptionType[]) => {
        this.lstSubs = data;
      },
      error => {
        console.error('Error fetching subscriptions', error);
      }
    );
  }

  checkingToLoad(flag: boolean) {
    if (flag) {
      this.cancleAction();
    }
  }

  cancleAction(): void {
    this.action = '';
    this.currentSubId = 0;
    this.showDeleteMess = false;
    this.loadSubscriptions();
  }
}
