import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = environment.baseApiUrl + '/login';

  constructor() { }

  login(username: string, password: string): boolean {
    //call to api
    return false;
  }
}
