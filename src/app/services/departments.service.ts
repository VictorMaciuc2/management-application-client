import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { Department } from '../models/department';
import { catchError, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  //private baseUrl = environment.baseApiUrl + '/departments';
  private baseUrl = 'assets/departments.json';
  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.baseUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data)))
        //catchError(this.handleError)
      );
  }

  getDepartment(id: number): Observable<Department | undefined> {
    return this.getDepartments()
      .pipe(
        map((products: Department[]) => products.find(p => p.id === id))
      );
  }
}
