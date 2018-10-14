import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class LoginService {

  private loggedInStatus = false
  private url = 'http://localhost:8080';

  constructor(private http: Http) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }

  get isLoggedIn() {
    return this.loggedInStatus
  }

  getUserDetails(username, password) {
    return this.http.post(this.url + '/funcionario/signin/', {
      login: username,
      senha: password
    })
      .map((response: Response) => response.json())
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        });
  }

  getEstado() {
    return this.http.get(this.url + '/estado').map((response: Response) => response.json())
  }


}
