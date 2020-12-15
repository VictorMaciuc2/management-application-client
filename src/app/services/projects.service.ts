import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import {Department} from '../models/department';
import {Project} from '../models/project';
import { Technology } from '../models/technology';
import { User } from '../models/user';
import {ConfigService} from '../utils/config';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private baseUrl = environment.baseApiUrl + '/projects';

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

  assignTechnologiesOnProject(projectId: number, technologies: Technology[]): Observable<any> {
    return this.http.post<Technology>(`${this.baseUrl}/technologies?projectid=${projectId}`, {technologies: technologies}, this.configService.getHttpOptions());
  }

  assignEmployeesOnProject(projectId: number, employees: User[]): Observable<any> {
    return this.http.post<Technology>(`${this.baseUrl}/users?projectid=${projectId}`, {users: employees}, this.configService.getHttpOptions());
  }

  unassignTechnologiesOnProject(projectId: number, technologyId: number): Observable<any> {
    return this.http.delete<Technology>(`${this.baseUrl}/technologies?projectid=${projectId}&&techid=${technologyId}`);
  }

  unassignEmployeesOnProject(projectId: number, employeeId: number): Observable<any> {
    return this.http.delete<Technology>(`${this.baseUrl}/users?projectid=${projectId}&&userid=${employeeId}`);
  }

  getUsersByProject(projectId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?projectid=${projectId}`);
  }

  getTechnologiesByProject(projectId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/technologies?projectid=${projectId}`);
  }
}
