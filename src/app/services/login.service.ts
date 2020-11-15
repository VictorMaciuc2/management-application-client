import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = environment.baseApiUrl + '/login';
  private apiUrl = 'http://127.0.0.1:5000/login';
  private httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) }

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.apiUrl, {'email': email, 'password': password}, this.httpOptions)
  }
}
