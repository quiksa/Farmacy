import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  fullImagePath: string;
  private login;
  private password;

  constructor() {
    this.fullImagePath = './assets/images/logo.png'
   }

  ngOnInit() {

  }

  signin(){
    

  }

}
