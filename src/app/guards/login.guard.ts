import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/local-storage.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private storage: StorageService,
                private router: Router) { }

    canActivate() {
        var user = this.storage.getLoggedInUser();

        if (user !== null && user !== undefined){
            this.router.navigate(['/home']);
            return false;
        }

        return true;
    }
}
