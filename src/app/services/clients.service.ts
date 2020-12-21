import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client';
import { ConfigService } from '../utils/config';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private baseUrl = environment.baseApiUrl + '/clients';

  constructor(private http: HttpClient, 
    private configService: ConfigService) { }

  save(client: Client): Observable<any> {
    return this.http.post<Client>(this.baseUrl, client, this.configService.getHttpOptions());
  }

  delete(id: String): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}?clientid=${id}`);
  }

  update(client: Client): Observable<any> {
    return this.http.put<Client>(this.baseUrl, client, this.configService.getHttpOptions());
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl);
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}?clientid=${id}`);
  }
}
