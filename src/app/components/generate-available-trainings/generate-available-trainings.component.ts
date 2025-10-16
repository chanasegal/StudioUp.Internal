import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-generate-available-trainings',
  templateUrl: './generate-available-trainings.component.html',
  styleUrls: ['./generate-available-trainings.component.scss'],
  providers: [MessageService]
})
export class GenerateAvailableTrainingsComponent {
  rangeDates?: Date[];
  numberOfMonths: number = 2; // ברירת מחדל - שני חודשים

  today: Date = new Date(); // תאריך נוכחי
  isWeekend:boolean=false;
  stateOptions: any[] = [
    { label: 'לא', value: false },
    { label: 'כן', value: true }
  ];
  
  value: string = ''; // Or set default value as per your requirement


  closeCalendarOnBlur(event: Event) {
    const calendarElement = document.querySelector('.p-calendar');

    if (event instanceof FocusEvent) {
        if (calendarElement && event.relatedTarget && !calendarElement.contains(event.relatedTarget as Node)) {
            (calendarElement as HTMLElement).classList.remove('p-calendar-visible');
           
        }
    } else {
        console.warn('Event is not of type FocusEvent');
    }
}


constructor(private messageService: MessageService) {}

onDateSelect(event: any) {
  if (this.rangeDates && this.rangeDates.length === 2) {
    const diffInTime = this.rangeDates[1].getTime() - this.rangeDates[0].getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    if (diffInDays > 30) {
      this.messageService.add({
        severity: 'error',
        summary: 'בחירת תאריכים לא תקינה',
        detail: 'ניתן לבחור טווח של עד 30 ימים בלבד'
      });
      // איפוס הבחירה במקרה של חריגה
      this.rangeDates = [];
    }
  }
}
isCalendarInline: boolean = false;

// פונקציה לפתיחה/סגירה של לוח השנה בלחיצות חוזרות
toggleCalendar() {
  this.isCalendarInline = !this.isCalendarInline;
}

// // ==============================================
isCalendarDisabled:boolean=false;
// // פונקציה לבדיקת מצב ה-rangeDates וכיבוי או הפעלת p-selectButton
checkSelectButtonState() {
//   if (this.rangeDates && this.rangeDates.length === 2) {
//     this.isSelectButtonDisabled = false;
//   } else if (this.rangeDates && this.rangeDates.length === 1 && this.isWeekend) {
//     this.isCalendarDisabled = true;
//     this.isSelectButtonDisabled = true;
//   } else {
//     this.isSelectButtonDisabled = true;
//     this.isCalendarDisabled = false;
//   }
}


tmp?:boolean;
onWeekendToggle() {
  if(this.isWeekend==null){
    this.isWeekend=false;
  }
  // אם יש תאריך אחד ועד סופ"ש
  if (this.isWeekend && this.rangeDates && 
    this.rangeDates.length === 2&&this.rangeDates[1]===null) {
    this.isCalendarDisabled = true;
  }
    //כל שאר המקרים
   else {
    this.isCalendarDisabled = false;
  }
  this.tmp= this.isWeekend && this.rangeDates && 
  this.rangeDates.length === 2&&this.rangeDates[1]===null;
}


// פונקציה שמפעילה לוגיקה כלשהי בעת לחיצה על "ביצוע"
submitForGenerateAvailableTraining() {
  if(!this.rangeDates)
  this.messageService.add({
    severity: 'error',
    summary: 'שגיאה',
    detail: 'יש לבחור לפחות תאריך אחד לפני ביצוע הפעולה'
  });
   else {
    if(this.rangeDates && this.rangeDates.length === 2){
      if(this.rangeDates[0]!=null){
        if(this.rangeDates[1]){
          //יש לך 2 תאריכים תקינים
          if(this.isWeekend){
            this.messageService.add({
              severity: 'error',
              summary: 'שגיאה',
              detail: 'טווח תאריכים נבחר,אנא בטל את ההגדרה לסופ"ש' 
            });
          }
          else{
            this.messageService.add({
              severity: 'success',
              summary: 'ביצוע הצליח',
              detail: 'הפעולה הושלמה בהצלחה!'
            });
          }

        }
        else{
          //הוגדר רק תאריך 1
          if(this.isWeekend){
            this.messageService.add({
              severity: 'success',
              summary: 'ביצוע הצליח',
              detail: 'הפעולה הושלמה בהצלחה!'
            });
          }
          //תאריך 1 בלי סופ"ש
          else{
            this.messageService.add({
              severity: 'error',
              summary: 'שגיאה',
              detail: 'אנא בחר תאריך נוסף או סמן את תיבת הסופ"ש' 
            });
          }
        }
        
      //פה צריך לסגור את החלון צף
      //שליחה לשרת
    }
      
      
    }
    
  }
}
ngOnInit() {
  this.updateCalendarMonths(window.innerWidth);
}
@HostListener('window:resize', ['$event'])
onResize(event: Event) {
  this.updateCalendarMonths(window.innerWidth);
}

updateCalendarMonths(width: number) {
  if (width <= 768) {
    this.numberOfMonths = 1; // הצג חודש אחד בלבד במסכים קטנים
  } else {
    this.numberOfMonths = 2; // הצג שני חודשים במסכים גדולים
  }
}
}
