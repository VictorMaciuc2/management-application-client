import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() { 
        var user = localStorage.getItem('username');

        if (user !== null){
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}