import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from './../survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
   survey = {}
   id = ""

   constructor(
      private _route: ActivatedRoute,
      private _surveyService: SurveyService,
   ) {
      this._route.paramMap.subscribe( params => {
         this.id = (params.get('id'));
      })
   }

   ngOnInit() {
      this.getSurvey()
   }

   getSurvey(){
      console.log(this.id)
      this._surveyService.getSurvey(this.id)
      .then(survey => {
         this.survey = survey;
      })
   }

}
