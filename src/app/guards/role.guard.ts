import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Role } from '../enums/Role';
import { StorageService } from '../services/local-storage.service';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private router: Router,
                private storage: StorageService) { }

    canActivate() {
        var user = this.storage.getLoggedInUser();
        var notAllowedHrPaths = ['/projects', '/feedback'];
        var notAllowedScrumMaterPaths = ['/employees', '/departments'];
        var notAllowedEmployeePaths = ['/clients', '/feedback'];
        var link = location.pathname;

        if(user.role == Role.Hr && notAllowedHrPaths.includes(link)) {
            this.router.navigate(['/home']);
            return false;
        }

        if(user.role == Role['Scrum Master'] && notAllowedScrumMaterPaths.includes(link)) {
            this.router.navigate(['/home']);
            return false;
        }

        if(user.role == Role.Employee && notAllowedEmployeePaths.includes(link)) {
            this.router.navigate(['/home']);
            return false;
        }

        return true;
    }
}
