import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
    getItem(key): string {
        return localStorage.getItem(key);
    }

    removeItem(key: string){
        localStorage.removeItem(key);
    }

    setItem(key, value){
        localStorage.setItem(key, value);
    }

    clear(){
        localStorage.clear();
    }

    setLoggedInUser(loggedInUser: User){
        this.setItem('loggedInUser', JSON.stringify(loggedInUser));
    }

    getLoggedInUser(){
        return <User> JSON.parse(this.getItem('loggedInUser'));
    }
}