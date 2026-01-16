import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // <-- this makes Angular inject it automatically
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, data);
  }
}
