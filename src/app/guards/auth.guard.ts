import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/local-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private storage: StorageService) { }

    canActivate() {
        var user = this.storage.getLoggedInUser();

        if (user !== null && user !== undefined){
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
