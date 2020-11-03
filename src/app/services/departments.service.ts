import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private baseUrl = environment.baseApiUrl + '/departments';

  constructor() { }
}
