import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor() { }

    canActivate() { 
        // Todo: If the user is logged in return true, if not redirect to login page and return false
        return true;
    }
}