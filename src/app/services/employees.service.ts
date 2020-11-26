import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { catchError, tap, map } from 'rxjs/operators';
import { Department } from '../models/department';
import { ConfigService } from '../utils/config';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private baseUrl = environment.baseApiUrl + '/users';

  constructor(private http: HttpClient,
    private configService: ConfigService) { }

  getEmployees(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  save(user: User): Observable<any> {
    return this.http.post<User>(this.baseUrl, user, this.configService.getHttpOptions());
  }

  delete(id: String): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}?userid=${id}`);
  }

  update(user: User): Observable<any> {
    return this.http.put<User>(this.baseUrl, user, this.configService.getHttpOptions());
  }

  
}
