import { Role } from '../enums/Role';
import { SeniorityLevel } from '../enums/SeniorityLevel';
import { Department } from './department';

export class User {
    id: number = null;
    email: string;
    name: string;
    jwtToken: string;
    seniorityLevel: SeniorityLevel;
    role: Role;
    departmentId: number;
    department: Department;
}