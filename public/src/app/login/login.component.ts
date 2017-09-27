import { Component, OnInit } from '@angular/core';
import { SurveyService } from './../survey.service'
import { Router } from '@angular/router'
import { User } from './../user';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   newUser = new User();

   constructor(
      private _surveyService: SurveyService,
      private _router: Router,
   ) { }

   ngOnInit() {
   }

   registerUser(){
      console.log("login > registerUser()")
      this._surveyService.registerUser(this.newUser);
      this._router.navigate(['/dashboard']);
   }
}
