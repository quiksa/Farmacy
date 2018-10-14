import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
import { NotificationComponent } from '../ui/components/notification/notification.component';

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

  signin() {
    if (this.login && this.pass) {
      if (this.auth.getUserDetails(this.login, this.pass)) {

      } else {

      }
    } else if (!this.login && !this.pass) {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Informe suas credênciais!',
      });
    } else if (!this.pass) {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Informe sua senha!',
      });
    } else if (!this.login) {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Informe seu usuário!',
      });
    }
  }

}
