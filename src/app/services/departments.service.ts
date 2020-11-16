import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Department } from '../models/department';
import { catchError, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private baseUrl = environment.baseApiUrl + '/departments';
  private httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) }

  constructor(private http: HttpClient) { }

  save(department: Department): Observable<any> {
    return this.http.post<Department>(this.baseUrl, department, this.httpOptions);
  }

  delete(id: String): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}?departmentid=${id}`);
  }

  update(department: Department): Observable<any> {
    return this.http.post<Department>(this.baseUrl, department, this.httpOptions);
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.baseUrl);
  }

  getDepartment(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.baseUrl}?departmentid=${id}`);
  }
}
