import { Component, OnInit } from '@angular/core';
import { SurveyService } from './../survey.service';
import { Survey } from './../survey';
import { Router } from '@angular/router'

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
   newSurvey = new Survey();
   currentUser = ""

   constructor(
      private _surveyService: SurveyService,
      private _router: Router,
   ) { }

   ngOnInit() {
   }

   getUser(){

   }

   createSurvey(){
      this._surveyService.createSurvey(this.newSurvey);
      this._router.navigate(['/dashboard']);
   }

}
