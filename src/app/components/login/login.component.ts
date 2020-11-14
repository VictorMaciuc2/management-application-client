import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public showError = false;

  constructor(private loginService: LoginService) { 
  }

  ngOnInit(): void {
  }

  onLogin(){
    this.showError = false;
    var result = this.loginService.login(this.username, this.password);

    if (result){
      //om vedea
    }
    else{
      this.showError = true;
    }
  }

}
