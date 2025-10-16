import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerService } from './Services/customers.service';
import { HttpClientModule } from "@angular/common/http";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SingleLessonComponent } from './components/single-lesson/single-lesson.component';
import { TrainingService } from './Services/trainig.servisec';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscriptionOptionsComponent } from './components/Subscriptions/subscription-options/subscription-options.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { SubscriptionService } from './Services/SubscriptionService';
import { SubscriptionFormComponent } from './components/Subscriptions/subscription-form/subscription-form.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { CustomerCardComponent } from "./components/customer-card/customer-card.component";
import { TrainingCustomerService } from './Services/trainingCustomer.service';
import { TrainingTypeService } from './Services/trainingType.service';
import { TrainerService } from './Services/trainers.service';
import { AvailableTraining } from './Models/availableTraining.model';
import { AvailableTrainingService } from './Services/availableTraining.service';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { TrainingsListComponent } from './components/available-trainings-list/available-trainings-list.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { HomeComponent } from './components/home/home.component';
import { TrainersListComponent } from './components/trainers-list/trainers-list.component';
import { TrainerCardComponent } from './components/trainer-card/trainer-card.component';
import { ManagmentTableComponent } from './components/managment-table/managment-table.component';
import { trainingCustomersTypes } from './Models/trainingCustomersTypes.model';
import { TrainingDeatailsComponent } from './components/training-deatails/training-deatails.component';
import { DayOfWeekPipe } from './components/training-deatails/day-of-week.pipe';
import { SelectButtonModule } from 'primeng/selectbutton';
import { GenerateAvailableTrainingsComponent } from './components/generate-available-trainings/generate-available-trainings.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [
    AppComponent,
    CustomersListComponent,
    SingleLessonComponent,
    SubscriptionOptionsComponent,
    SubscriptionFormComponent,
    TrainingsListComponent,
    HomeComponent,
    TrainersListComponent,
    ManagmentTableComponent,
    TrainingDeatailsComponent,
    DayOfWeekPipe,
    FooterComponent,
    GenerateAvailableTrainingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    BrowserAnimationsModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ToolbarModule,
    SpeedDialModule,
    FieldsetModule,
    InputNumberModule,
    CustomerCardComponent,
    TrainerCardComponent,
    SplitButtonModule,
    MessagesModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    CalendarModule,
    CustomerCardComponent,
    TrainerCardComponent,
    SelectButtonModule,
    SidebarModule,
    ButtonModule, 

  ],
  providers: [CustomerService,
    TrainingService,
    SubscriptionService,
    ConfirmationService,
    MessageService,
    TrainingCustomerService,
    TrainingTypeService,
    TrainerService,
    AvailableTrainingService

  
],

  bootstrap: [AppComponent]
})
export class AppModule { }
