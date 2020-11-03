import { Project } from './project';
import { User } from './user';

export class ReportSession {
    user: User;
    project: Project;
    startDate: Date;
    endDate: Date;
    wasCompleted: boolean;
}