import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import {Department} from '../models/department';
import {Project} from '../models/project';
import {ConfigService} from '../utils/config';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private baseUrl = environment.baseApiUrl + '/projects';
  private httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };

  constructor(private http: HttpClient,
              private configService: ConfigService) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }

  save(project: Project): Observable<any> {
    return this.http.post<Project>(this.baseUrl, project, this.configService.getHttpOptions());
  }

  delete(id: String): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}?projectid=${id}`);
  }

  update(project: Project): Observable<any> {
    return this.http.put<Project>(this.baseUrl, project, this.configService.getHttpOptions());
  }
}
