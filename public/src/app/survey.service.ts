import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs';

@Injectable()
export class SurveyService {

   constructor(private _http: Http) { }

   registerUser(user){
      console.log("service > registerUser()", user)
      return this._http.post('users', user)
      .subscribe(
         (res)=>{
            console.log("Service Sucess")
         },
         (err) => {
            console.log(err)
         }
      )
   }

   createSurvey(survey){
      console.log("service > createSurvey")
      return this._http.post('surveys', survey)
      .subscribe(
         (res) => {
            console.log("Service > survey")
         },
         (err) => {
            console.log(err)
         }
      )
   }
   retrieveSurveys(){
      console.log("service > retrieveSurvyes")
      return this._http.get('/surveys')
      .map(data => data.json())
      .toPromise();
   }

   getSurvey(id){
      console.log("service > retieveSurvey ", id);
      return this._http.get(`/surveys/${id}`)
      .map(data => data.json())
      .toPromise();
   }

   deleteSurvey(id){
      console.log('service delete', id)
      return this._http.get(`/survey/${id}`)
      .subscribe(
         (res)=> {
            console.log('successful response from server')
         },
         (err) => {
            console.log(err)
         }
      )
   }
}
