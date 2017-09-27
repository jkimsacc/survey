import { Component, OnInit } from '@angular/core';
import { SurveyService } from './../survey.service';
import { Survey } from './../survey';
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   surveys: Array<Survey> = [];

   constructor(
      private _surveyService: SurveyService,
      private _router: Router,
   ) {
      this.retrieveSurveys();
   }

   ngOnInit() {
   }

   retrieveSurveys(){
      console.log("dashboard > retrieveSurveys");
      this._surveyService.retrieveSurveys()
      .then(surveys => {
         this.surveys = surveys;
      })
   }

   delete(id){
      console.log("delete > ", id)
      this._surveyService.deleteSurvey(id)
      this._router.navigate(['/dashboard']);
   }

}
