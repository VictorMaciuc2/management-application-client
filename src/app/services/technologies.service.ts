import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Technology } from '../models/technology';
import { ConfigService } from '../utils/config';

@Injectable({
  providedIn: 'root'
})
export class TechnologiesService {
  private baseUrl = environment.baseApiUrl + '/projects/technologies';

  constructor(private http: HttpClient,
              private configService: ConfigService) { }

  getTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>(this.baseUrl);
  }

  save(technology: Technology): Observable<any> {
    return this.http.post<Technology>(this.baseUrl, technology, this.configService.getHttpOptions());
  }
}
