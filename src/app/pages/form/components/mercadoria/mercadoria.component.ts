import { CadastroService } from '../../../../services/cadastro.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import swal from 'sweetalert2';
import 'rxjs/add/operator/delay';

export class Mercadoria {
  idmercadoria: string
  nmmercadoria: string
  idfornecedor: string
  idcategoria: string
  dscomplemento: string
}

@Component({
  selector: 'app-mercadoria',
  templateUrl: './mercadoria.component.html',
  styleUrls: ['./mercadoria.component.scss'],
})
export class MercadoriaComponent implements OnInit {
  tableData: Array<any>;
  pageSize = 10;
  pageNumber = 1;

  private idmercadoria
  private nmmercadoria
  private idfornecedor
  private idcategoria
  private dscomplemento
  private categoriaList
  private fornecedorList

  constructor(private cadastroservice: CadastroService) { }


  ngOnInit() {
    this.loadMercadoria()
    this.loadCategoria()
    this.loadFornecedor()
  }

  loadMercadoria() {
    this.cadastroservice.loadMercadoria()
      .subscribe(res => {
        this.tableData = res
        debugger
      }, err => {
        console.log("Error occured");
      });
  }

  loadCategoria() {
    this.cadastroservice.loadCategoria()
      .subscribe(res => {
        this.categoriaList = res
      }, err => {
        console.log("Error occured");
      });
  }

  loadFornecedor() {
    this.cadastroservice.loadFornecedor()
      .subscribe(res => {
        this.fornecedorList = res
      }, err => {
        console.log("Error occured");
      });
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  clean() {
    this.idmercadoria = null
    this.nmmercadoria = null
    this.idfornecedor = null
    this.idcategoria = null
    this.dscomplemento = null
  }

  cadastra() {
    if (!this.nmmercadoria || !this.idfornecedor || !this.idcategoria || !this.dscomplemento) {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Há campos vazios, verifique por favor.',
      });
    } else {
      let mercadoria = new Mercadoria();
      mercadoria.dscomplemento = this.dscomplemento
      mercadoria.idcategoria = this.idcategoria
      mercadoria.idfornecedor = this.idfornecedor
      mercadoria.idmercadoria = this.idmercadoria
      mercadoria.nmmercadoria = this.nmmercadoria
      this.cadastroservice.saveOrUpdateMercadoria(mercadoria).subscribe(res => {
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
    this.nmmercadoria = item.nmmercadoria
    this.idfornecedor = item.fornecedor.idFornecedor
    this.idcategoria = item.categoria.idCategoria
    this.dscomplemento = item.dsComplemento
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
