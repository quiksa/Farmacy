import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch'
import { Unidade } from '../pages/form/components/unidade/unidade.component';
import { Cliente } from '../pages/form/components/cliente/cliente.component';
import { Funcionario } from '../pages/form/components/funcionario/funcionario.component';

const url = 'http://localhost:8080';

@Injectable()
export class CadastroService {

  constructor(private http: Http) { }

  saveOrUpdateUnidade(unidade: Unidade): Observable<any> {
    return this.http.post(url + '/unidade/insertOrUpdadeUnidade', {
      idUnidade: unidade.idunidade,
      dsUnidade: unidade.dsunidade,
      nmUnidade: unidade.nmunidade,
      nmRduzido: unidade.nmreduzido,
      nmRua: unidade.nmrua,
      dsComplemento: unidade.dscomplemento,
      nmBairro: unidade.bairro,
      cnpj: unidade.cnpj,
      idCidade: unidade.idcidade,
      idendereco: unidade.idendereco
    })
  }

  loadClientes() {
    return this.http.get(url + '/cliente').map((response: Response) => response.json())
  }

  loadUnidades() {
    return this.http.get(url + '/unidade').map((response: Response) => response.json())
  }

  deleteUnidade(idunidade) {
    return this.http.get(url + '/unidade/deletaUnidade', {
      params: {
        idunidade: idunidade,
      }
    })
  }

  saveOrUpdateFuncionario(funcionario: Funcionario): Observable<any> {
    return this.http.post(url + '/funcionario/insertOrUpdadeFuncionario', {
      idcargo: funcionario.idcargo,
      idcidade: funcionario.idcidade,
      idEndereco: funcionario.idendereco,
      idFuncionario: funcionario.idfuncionario,
      idpessoa: funcionario.idpessoa,
      idunidade: funcionario.idunidade,
      bairro: funcionario.bairro,
      dscomplemento: funcionario.dscomplemento,
      dtnascimento: funcionario.dtnascimento,
      email: funcionario.email,
      nmPessoa: funcionario.nmpessoa,
      nmrua: funcionario.nmrua,
      nrCpf: funcionario.nrcpf,
      nrTelefone: funcionario.nrtelefone,
      senha: funcionario.senha,
      sgsexo: funcionario.sgsexo,
      login: funcionario.usuario
    })
  }

  deleteCliente(idcliente) {
    return this.http.get(url + '/cliente/deleteCliente', {
      params: {
        idcliente: idcliente,
      }
    })
  }

  deleteCargo(idcargo) {
    return this.http.get(url + '/cargo/deleteCargo', {
      params: {
        idcargo: idcargo,
      }
    })
  }

  saveOrUpdateCargo(cargo): Observable<any> {
    return this.http.post(url + '/cargo/insertOrUpdadeCargo', {
      idCargo: cargo.idcargo,
      nmCargo: cargo.nmcargo,
      dsCargo: cargo.dscargo
    })
  }

  loadFuncionarios(){
    return this.http.get(url + '/funcionario/load').map((response: Response) => response.json())
  }

  loadCargos() {
    return this.http.get(url + '/cargo/load').map((response: Response) => response.json())
  }

  getCidade(estado) {
    return this.http.get(url + '/cidade/estado=' + estado).map((response: Response) => response.json())
  }

  getEstados(filter): Observable<Array<any>> {
    return this.http.get(url + '/estado').map((response: Response) => response.json())
    //return this.http.get(this.url + '/estado').map((res) => { return this.extractFilteredData(res, filter) }).catch(this.handleError);
  }

  saveOrUpdateCliente(cliente: Cliente): Observable<any> {
    return this.http.post(url + '/cliente/insertOrUpdadeCliente', {
      idpessoa: cliente.idpessoa,
      idCliente: cliente.idcliente,
      nmPessoa: cliente.nmpessoa,
      email: cliente.email,
      nrCpf: cliente.nrcpf,
      nrTelefone: cliente.nrtelefone,
      nmrua: cliente.nmrua,
      dtnascimento: cliente.dtnascimento,
      dscomplemento: cliente.dscomplemento,
      bairro: cliente.bairro,
      idcidade: cliente.idcidade,
      idEndereco: cliente.idendereco,
      sgsexo: cliente.sgsexo
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
