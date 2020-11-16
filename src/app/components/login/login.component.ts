import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { StorageService } from 'src/app/services/local-storage.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  private user: User;
  public showError = false;

  constructor(private loginService: LoginService,
              private storageService: StorageService,
              private router: Router) { 
  }

  ngOnInit(): void {
  }

  onLogin(){
    this.showError = false;
    this.loginService.login(this.email, this.password).subscribe(
      user => {
        this.user = user;
        if (this.user !== null && this.user !== undefined){
          this.router.navigate(['/home']);
          this.storageService.setLoggedInUser(this.user);
        }
        else{
          this.showError = true;
        }
      })
  }
}
