import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch'
import { Unidade } from '../pages/form/components/unidade/unidade.component';
import { Cliente } from '../pages/form/components/cliente/cliente.component';
import { Funcionario } from '../pages/form/components/funcionario/funcionario.component';
import { Fornecedor } from '../pages/form/components/fornecedor/fornecedor.component';
import { Estoque } from '../pages/form/components/estoque/estoque.component';
import { Mercadoria } from '../pages/form/components/mercadoria/mercadoria.component';
import { MovimentoMercadoria } from '../pages/form/components/movimentoestoque/movimentoestoque.component';

const url = 'http://localhost:8080';

@Injectable()
export class CadastroService {


  constructor(private http: Http) { }

  saveOrUpdateMercadoria(mercadoria: Mercadoria): any {
    return this.http.post(url + '/mercadoria/insertOrUpdadeMercadoria', {
      idMercadoria: mercadoria.idmercadoria,
      nmMercadoria: mercadoria.nmmercadoria,
      dsComplemento: mercadoria.dscomplemento,
      codBarra: mercadoria.codbarras,
      idcategoria: mercadoria.idcategoria
    })
  }

  saveOrUpdateEstoque(estoque: Estoque): any {
    return this.http.post(url + '/estoque/insertOrUpdadeEstoque', {
      idEstoque: estoque.idestoque,
      idUnidade: estoque.idunidade,
      dsEstoque: estoque.dsestoque
    })
  }

  saveOrUpdateFornecedor(fornecedor: Fornecedor): Observable<any> {
    return this.http.post(url + '/fornecedor/insertOrUpdadeFornecedor', {
      idcidade: fornecedor.idcidade,
      idEndereco: fornecedor.idendereco,
      idpessoa: fornecedor.idpessoa,
      bairro: fornecedor.bairro,
      dscomplemento: fornecedor.dscomplemento,
      dsFornecedor: fornecedor.dsfornecedor,
      email: fornecedor.email,
      nmPessoa: fornecedor.nmpessoa,
      nmrua: fornecedor.nmrua,
      nrtelefone: fornecedor.nrtelefone,
      cnpj: fornecedor.cnpj,
      nrTelefone: fornecedor.nrtelefone
    })
  }


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

  saveOrUpdateMovimentoMercadoria(movimentomercadoria: MovimentoMercadoria): any {
    debugger
    return this.http.post(url + '/movimentomercadoriaestoque/insertOrUpdadeMovimentoMercadoriaEstoque', {
      idfornecedor: movimentomercadoria.idfornecedor,
      idmercadoria: movimentomercadoria.idmercadoria,
      idestoque: movimentomercadoria.idestoque,
      idmovimentoestoque: movimentomercadoria.idmovimentoestoque,
      dslote: movimentomercadoria.dslote,
      qtMovimentoMercadoria: movimentomercadoria.qtmovimentomercadoria,
      vlMovimentoMercadoria: movimentomercadoria.vlmercadoria
    })
  }

  loadMercadoria(): any {
    return this.http.get(url + '/mercadoria/load').map((response: Response) => response.json())
  }

  loadEstoque() {
    return this.http.get(url + '/estoque/load').map((response: Response) => response.json())
  }

  loadClientes() {
    return this.http.get(url + '/cliente').map((response: Response) => response.json())
  }

  loadUnidades() {
    return this.http.get(url + '/unidade').map((response: Response) => response.json())
  }

  loadFornecedor(): any {
    return this.http.get(url + '/fornecedor').map((response: Response) => response.json())
  }

  loadCategoria(): any {
    return this.http.get(url + '/categoria/load').map((response: Response) => response.json())
  }

  loadFuncionarios() {
    return this.http.get(url + '/funcionario/load').map((response: Response) => response.json())
  }

  loadCargos() {
    return this.http.get(url + '/cargo/load').map((response: Response) => response.json())
  }

  getCidade(estado) {
    return this.http.get(url + '/cidade/estado=' + estado).map((response: Response) => response.json())
  }

  getEstados(filter): Observable<Array<any>> {
    return this.http.get(url + '/estado/load').map((response: Response) => response.json())
    //return this.http.get(this.url + '/estado').map((res) => { return this.extractFilteredData(res, filter) }).catch(this.handleError);
  }

  deleteUnidade(idunidade) {
    return this.http.get(url + '/unidade/deletaUnidade', {
      params: {
        idunidade: idunidade,
      }
    })
  }

  deleteEstoque(idEstoque) {
    return this.http.get(url + '/estoque/deleteEstoque', {
      params: {
        idestoque: idEstoque
      }
    })
  }

  deleteCategoria(idCategoria: any): any {
    return this.http.get(url + '/categoria/deleteCategoria', {
      params: {
        idCategoria: idCategoria,
      }
    })
  }

  deleteFornecedor(idFornecedor) {
    return this.http.get(url + '/fornecedor/deleteFornecedor', {
      params: {
        idFornecedor: idFornecedor,
      }
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
      nrcpf: funcionario.nrcpf,
      nrTelefone: funcionario.nrtelefone,
      senha: funcionario.senha,
      sgsexo: funcionario.sgsexo,
      login: funcionario.usuario
    })
  }

  saveOrUpdateCargo(cargo): Observable<any> {
    return this.http.post(url + '/cargo/insertOrUpdadeCargo', {
      idCargo: cargo.idcargo,
      nmCargo: cargo.nmcargo,
      dsCargo: cargo.dscargo
    })
  }

  saveOrUpdateCategoria(categoria): Observable<any> {
    return this.http.post(url + '/categoria/insertOrUpdadeCategoria', {
      idCategoria: categoria.idcategoria,
      nmCategoria: categoria.nmcategoria,
      dsCategoria: categoria.dscategoria
    })
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
