import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckUserResponseData, SubmitFormResponseData } from '../shared/interface/responses';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private http: HttpClient,
  ) { }

  public checkUsername(username: string): Observable<CheckUserResponseData> {
    return this.http.post<CheckUserResponseData>('/api/checkUsername', { username });
  }

  public submitForm(data: any): Observable<SubmitFormResponseData> {
    return this.http.post<SubmitFormResponseData>('/api/submitForm', { data });
  }
}
