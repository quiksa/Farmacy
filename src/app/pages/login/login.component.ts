import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  fullImagePath: string;
  private login;
  private pass;

  constructor(private auth: LoginService) {
    this.fullImagePath = './assets/images/logo.png'
   }

  ngOnInit() {

  }

  signin(){
    if(this.auth.getUserDetails(this.login,this.pass)){
      
    }
  }

}
