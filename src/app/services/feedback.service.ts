import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Report } from '../models/report';
import { ReportSession } from '../models/reportSession';
import { Skill } from '../models/skill';
import { User } from '../models/user';
import { ConfigService } from '../utils/config';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = environment.baseApiUrl + '/feedback';

  constructor(private http: HttpClient,
              private configService: ConfigService) { }

  getReportSessionsForUser(user: User){
    return this.http.get<ReportSession[]>(this.baseUrl + `/sessions?userid=${user.id}`);
  }

  getSkills(){
    return this.http.get<Skill[]>(this.baseUrl + "/skills");
  }

  submitReportSession(session: ReportSession, reports: any){
    var reportsObject = [];
    reports.forEach(reportsEmployee => {
      if (reportsEmployee !== undefined) {
        reportsEmployee.forEach(report => {
          reportsObject.push({"user_id": report.user.id, "skill_id": report.skill.id, "project_id": session.project.id, "mark": report.mark});
        });
      }
    });
    return this.http.post(`${this.baseUrl}?sessionid=${session.id}`, {"reports": reportsObject}, this.configService.getHttpOptions())
  }

  startSession(project_id: number, start_date: string, end_date: string){
    return this.http.post(this.baseUrl + "/sessions", 
                {'project_id': project_id, 'start_date': start_date, 'end_date': end_date}, this.configService.getHttpOptions());
  }
}
