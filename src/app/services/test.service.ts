import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private url = `http://127.0.0.1:5000/people`;

  constructor(private http: HttpClient) { }

  testCall(): Observable<any>{
    return this.http.get(this.url);
  }
}
