import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor() { }

    canActivate() {
        // Todo: If the user is logged in return false and redirect to home page, if not return true
        return true;
    }
}