import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private baseUrl = environment.baseApiUrl + '/projects';

  constructor() { }
}