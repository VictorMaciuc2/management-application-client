import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { catchError, tap, map } from 'rxjs/operators';
import { Role } from '../enums/role';
import { SeniorityLevel } from '../enums/seniorityLevel';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
 // private baseUrl = environment.baseApiUrl + '/employees';
  private baseUrl = 'assets/employeees.json';
  constructor(private http: HttpClient) { }
  save( email: String, name: String,rol : Role, seniorityLevel: SeniorityLevel, deparment: Department): void{
   console.log(name)
   //api aici
  }

  delete(id : String): void{
    console.log(id)
    //api aici
  }
  update(id : String, email: String, name: String,rol : Role, seniorityLevel: SeniorityLevel, deparment: Department): void{
    console.log(id)
    //api aici
  }

  getEmployees(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data)))
        //catchError(this.handleError)
      );
  }

  getEmployee(id: number): Observable<User | undefined> {
    return this.getEmployees()
      .pipe(
        map((products: User[]) => products.find(p => p.id === id))
      );
  }
}
