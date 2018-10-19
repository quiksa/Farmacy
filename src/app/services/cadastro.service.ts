import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CadastroService {

  private url = 'http://localhost:8080';

  constructor(private http: Http) { }


//Erro Aqui, me parece que não retorna nada da API
  getCidade(estado) {
    this.http.get(this.url +'/cidade/estado='+ estado).map((response: Response) => response.json())
    
  }
}
