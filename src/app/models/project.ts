import { Department } from './department';
import {Technology} from './technology';
import { User } from './user';

export class Project {
    id: number = null;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    deadlineDate: Date;
    technologies: Technology[];
    users: User[];
}
