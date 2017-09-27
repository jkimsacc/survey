import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { SurveyComponent } from './survey/survey.component';

const routes: Routes = [
   { path: '', pathMatch: 'full', component: LoginComponent },
   { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },
   { path: 'create', pathMatch: 'full', component: CreatePollComponent },
   { path: 'poll/:id', component: SurveyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
