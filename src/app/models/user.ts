import { Role } from '../enums/role';
import { SeniorityLevel } from '../enums/seniorityLevel';
import { Department } from './department';

export class User {
    id: number;
    email: string;
    name: string;
    role: string;
    seniority_level: string;
    department_id: number;
}