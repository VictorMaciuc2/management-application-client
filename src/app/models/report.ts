import { Project } from './project';
import { Skill } from './skill';
import { User } from './user';

export class Report {
    project: Project;
    user: User;
    skill: Skill;
    mark: number;
    date: Date;
}