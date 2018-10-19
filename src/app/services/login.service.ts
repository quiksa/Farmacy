import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions } from '@angular/http';

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
    let parametro = JSON.stringify({
      "idFuncionario": null,
      "idPessoa": null,
      "login":username,
      "senha":password,
      "idUnidade": null,
      "idCargo": null,
      "dhinsert": null,
      "dhdesativacao": null
      });
    let headers = new Headers({'Content-type':'application/json'});
    let options = new RequestOptions({headers:headers});

    return this.http.post(this.url + '/funcionario/signin/', parametro,options)
      .map((response: Response) => response.json())
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        });
  }
}
