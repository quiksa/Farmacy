import { CadastroService } from '../../../../services/cadastro.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import swal from 'sweetalert2';
import 'rxjs/add/operator/delay';

export class MovimentoMercadoria {
  idfornecedor: string
  idestoque: string
  idmovimentoestoque: string
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
  tableData: Array<any>;
  pageSize = 10;
  pageNumber = 1;

  private idmercadoria
  private idestoque
  private vlmercadoria
  private qtmovimentomercadoria
  private idmovimentoestoque
  private idfornecedor
  private dslote
  private fornecedorList
  private mercadoriaList
  private estoqueList

  constructor(private cadastroservice: CadastroService) { }


  ngOnInit() {
    this.loadMercadoria()
    this.loadFornecedor()
    this.loadEstoque()
  }

  loadEstoque() {
    this.cadastroservice.loadEstoque()
      .subscribe(res => {
        this.estoqueList = res.map(data => {
          data.nome = data.unidade.nmRduzido + '/' + data.dsEstoque
          return data
        })
      }, err => {
        console.log("Error occured");
      });
  }

  loadMercadoria() {
    this.cadastroservice.loadMercadoria()
      .subscribe(res => {
        this.mercadoriaList = res
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
    this.idestoque = null
    this.idfornecedor = null
    this.qtmovimentomercadoria = null
    this.vlmercadoria = null
    this.dslote = null
    this.idmovimentoestoque = null
  }

  cadastra() {
    if (!this.idmercadoria || !this.idestoque || !this.idfornecedor || !this.qtmovimentomercadoria || !this.vlmercadoria) {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Há campos vazios, verifique por favor.',
      });
    } else {
      let movimentomercadoria = new MovimentoMercadoria();
      movimentomercadoria.idestoque = this.idestoque
      movimentomercadoria.idfornecedor = this.idfornecedor
      movimentomercadoria.idmercadoria = this.idmercadoria
      movimentomercadoria.vlmercadoria = this.vlmercadoria
      movimentomercadoria.dslote = this.dslote
      movimentomercadoria.idmovimentoestoque = this.idmovimentoestoque
      movimentomercadoria.qtmovimentomercadoria = this.qtmovimentomercadoria
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
    this.idmercadoria = item.idMercadoria
  }

  excluir(item) {
    swal({
      title: 'Excluir Estoque',
      text: 'Tem certeza que deseja excluir a estoque?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Excluir!'
    }).then((result) => {
      if (result.value) {
        this.cadastroservice.deleteEstoque(item.idEstoque).subscribe(res => {
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
}
