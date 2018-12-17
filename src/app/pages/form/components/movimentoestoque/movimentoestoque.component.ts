import { CadastroService } from '../../../../services/cadastro.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import swal from 'sweetalert2';
import 'rxjs/add/operator/delay';

export class MovimentoMercadoria {
  idmovimentomercadoria: string
  idfornecedor: string
  idestoque: string
  idmovimentoestoque: string
  dtvalidade: string
  vlmercadoria: string
  qtmovimentomercadoria: string
  idmercadoria: string
  dslote: string
}

@Component({
  selector: 'app-movimentoestoque',
  templateUrl: './movimentoestoque.component.html',
  styleUrls: ['./movimentoestoque.component.scss'],
})
export class MovimentoEstoqueComponent implements OnInit {

  public date = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  
  tableData: Array<any>;
  pageSize = 10;
  pageNumber = 1;

  public idmercadoria
  public dtvalidade
  public vlmercadoria
  public qtmovimentomercadoria
  public idmovimentoestoque
  public idfornecedor
  public dslote
  public idmovimentomercadoria
  public fornecedorList
  public mercadoriaList
  public estoqueList

  constructor(private cadastroservice: CadastroService) { }


  ngOnInit() {
    this.loadMercadoria()
    this.loadFornecedor()
    this.loadEntradaEstoque()
  }

  loadMercadoria() {
    this.cadastroservice.loadMercadoria()
      .subscribe(res => {
        this.mercadoriaList = res
      }, err => {
        console.log("Error occured");
      });
  }


  loadEntradaEstoque() {
    this.cadastroservice.loadEntradaEstoque()
      .subscribe(res => {
        this.tableData = res
        debugger
      }, err => {
        console.log("Error occured");
      });
  }


  loadFornecedor() {
    this.cadastroservice.loadFornecedor()
      .subscribe(res => {
        this.fornecedorList = res.map(data => {
          data.nmPessoa = data.pessoa.nmPessoa
          return data
        })
      }, err => {
        console.log("Error occured");
      });
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  clean() {
    this.idmercadoria = null
    this.idfornecedor = null
    this.qtmovimentomercadoria = null
    this.vlmercadoria = null
    this.dslote = null
    this.dtvalidade = null
    this.idmovimentoestoque = null
  }

  cadastra() {
    if (!this.idmercadoria || !this.idfornecedor || !this.qtmovimentomercadoria || !this.vlmercadoria) {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Há campos vazios, verifique por favor.',
      });
    } else {
      let movimentomercadoria = new MovimentoMercadoria();
      movimentomercadoria.idfornecedor = this.idfornecedor
      movimentomercadoria.idmercadoria = this.idmercadoria
      movimentomercadoria.vlmercadoria = this.vlmercadoria
      movimentomercadoria.dslote = this.dslote
      movimentomercadoria.dtvalidade = this.dtvalidade
      movimentomercadoria.idmovimentoestoque = this.idmovimentoestoque
      movimentomercadoria.qtmovimentomercadoria = this.qtmovimentomercadoria
      movimentomercadoria.idmovimentomercadoria = this.idmovimentomercadoria
      this.cadastroservice.saveOrUpdateMovimentoMercadoria(movimentomercadoria).subscribe(res => {
        let newItem = (JSON.parse(res._body))
        let updateItem = this.tableData.find(this.findIndexToUpdate, newItem.idEstoque);
        if (updateItem) {
          let index = this.tableData.indexOf(updateItem);
          this.tableData[index] = newItem;
        } else {
          this.tableData.push(newItem)
        }
        this.clean();
      }, err => {
        console.log("Error occured");
      })
    }
  }

  findIndexToUpdate(newItem) {
    return newItem.idEstoque === this;
  }

  editar(item) {
    this.idmercadoria = item.mercadoria.idMercadoria
    this.idfornecedor = item.fornecedor.idFornecedor
    this.idmovimentoestoque = item.movimentoestoque.idMovimentoEstoque
    this.idmovimentomercadoria = item.idMovimentoMercadoria
    this.qtmovimentomercadoria = item.qtMovimentoMercadoria
    this.dtvalidade = item.movimentoestoque.dtValidade
    this.vlmercadoria = item.vlMovimentoMercadoria
    this.dslote = item.movimentoestoque.dsLote
  }

  excluir(item) {
    swal({
      title: 'Excluir Movimentação',
      text: 'Tem certeza que deseja excluir a movimentação no estoque?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Excluir!'
    }).then((result) => {
      if (result.value) {
        this.cadastroservice.deleteMovimentacao(item.idMovimentoMercadoria).subscribe(res => {
          const index: number = this.tableData.indexOf(item);
          if (index !== -1) {
            this.tableData.splice(index, 1);
            this.clean();
          }
        }, err => {
          console.log("Error occured");
        })
      }
    });
  }

  loadData() {

  }
}
