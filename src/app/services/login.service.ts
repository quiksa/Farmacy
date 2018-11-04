import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

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

  loadUnidades() {
    return this.http.get(this.url + '/unidade').map((response: Response) => response.json())
  }

  login(username, password, idunidade) {
    return this.http.post(this.url + '/funcionario/signin/', {
      idunidade: idunidade,
      login: username,
      senha: password
    }).map((response: Response) => response.json())
  }
}
