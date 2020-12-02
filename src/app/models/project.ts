import { Client } from './client';
import { Department } from './department';
import {Technology} from './technology';
import { User } from './user';

export class Project {
    id: number = null;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date = null;
    deadlineDate: Date;
    clientId: number;
    client: Client;
    technologies: Technology[] = [];
    employees: User[] = [];
}
