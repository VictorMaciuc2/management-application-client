import { Department } from './department';
import { Tehnology } from './tehnology';
import { User } from './user';

export class Project {
    id: number = null;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    deadlineDate: Date;
    tehnologies: Tehnology[];
    users: User[];
}