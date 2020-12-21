import { Project } from './project';
import { User } from './user';

export class ReportSession {
    id: number;
    user: User;
    project: Project;
    start_date: Date;
    end_date: Date;
    was_completed: boolean;
}