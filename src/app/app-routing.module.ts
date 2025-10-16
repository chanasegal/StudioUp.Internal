import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { SingleLessonComponent } from './components/single-lesson/single-lesson.component';
import { CustomerCardComponent } from './components/customer-card/customer-card.component';
import { TrainingsListComponent } from './components/available-trainings-list/available-trainings-list.component';
import { HomeComponent } from './components/home/home.component';
import { TrainersListComponent } from './components/trainers-list/trainers-list.component';
import { ManagmentTableComponent } from './components/managment-table/managment-table.component';
import { SubscriptionOptionsComponent } from './components/Subscriptions/subscription-options/subscription-options.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  { path: 'customers-list', component: CustomersListComponent },
  { path: 'single-lesson', component: SingleLessonComponent },
  { path: 'customer-card/:id', component: CustomerCardComponent },
  { path: 'trainings-list', component: TrainingsListComponent },
  { path: 'trainers-list', component:TrainersListComponent },
  {path:'managment-table',component:ManagmentTableComponent},
  { path: 'subscriptions-options', component:SubscriptionOptionsComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
