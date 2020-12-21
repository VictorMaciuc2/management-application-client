import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {User} from './models/user';
import {StorageService} from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'management-application-client';
  isLoggedIn: boolean;
  loggedUser: User;

  constructor(private storage: StorageService,
              private router: Router) {
    router.events.subscribe(val => {
      this.isLoggedIn = this.getLoginStatus();
      this.loggedUser = storage.getLoggedInUser();
    });
  }

  getLoginStatus() {
    const user = this.storage.getLoggedInUser();

    if (user !== null && user !== undefined){
      return true;
    }
    return false;
  }

  onSignOut() {
    this.storage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
