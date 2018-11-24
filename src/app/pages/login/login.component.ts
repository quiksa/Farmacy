import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  fullImagePath: string;
  public unidadeList
  public login;
  public pass;
  public idUnidade

  constructor(private auth: LoginService, private router: Router) {
    this.fullImagePath = './assets/images/logo.png'
  }

  ngOnInit() {
    this.loadUnidades()
  }

  loadUnidades() {
    this.auth.loadUnidades()
      .subscribe(res => {
        this.unidadeList = res
      }, err => {
        console.log("Error occured");
      });
  }

  signin() {
    if (this.login && this.pass && this.idUnidade) {
      let passmd5 = Md5.hashStr(this.pass)
      this.auth.login(this.login, passmd5, this.idUnidade).subscribe(res => {
        sessionStorage.setItem('username', res.pessoa.nmPessoa)
        sessionStorage.setItem('userjob', res.cargo.nmCargo)
        sessionStorage.setItem('unidadelog',res.unidade.nmRduzido)
        sessionStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/pages/index'])
      }, err => {

        console.log("Login Error");
      });


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
