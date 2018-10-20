import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch'

@Injectable()
export class CadastroService {

  private url = 'http://localhost:8080';

  constructor(private http: Http) { }


  //Erro Aqui, me parece que não retorna nada da API
  getCidade(estado) {
    return this.http.get(this.url + '/cidade/estado=' + estado).map((response: Response) => response.json())
  }

  getEstados(filter): Observable<Array<any>> {
    return this.http.get(this.url + '/estado').map((response: Response) => response.json())
    //return this.http.get(this.url + '/estado').map((res) => { return this.extractFilteredData(res, filter) }).catch(this.handleError);
  }

  saveOrUpdateCliente(idpessoa, nome, email, cpf, nrtelefone, rua, complemento, bairro, idcidade) {
    return this.http.post(this.url + '/funcionario/saveOrUpdate', {
      idpessoa: idpessoa,
      nmpessoa: nome,
      email: email,
      cpf: cpf,
      nrtelefone: nrtelefone,
      nmrua: rua,
      dscomplemento: complemento,
      bairro: bairro,
      idcidade: idcidade
    })
  }

  private extractFilteredData(res: Response, filter: string) {
    let body = res.json().filter((item: any) => { return item.nmEstado.toLowerCase().indexOf(filter) != -1 });
    return body || [];
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}