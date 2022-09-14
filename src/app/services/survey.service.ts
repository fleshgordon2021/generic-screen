import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(
    private http: HttpClient
  ) { }

  public getSurveys() {
    return this.http.get(`http://localhost:3000/surveys`);
  }
}
