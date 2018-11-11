import { CadastroService } from '../../../../services/cadastro.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import swal from 'sweetalert2';
import 'rxjs/add/operator/delay';

export class Estoque {
  idunidade: string
  idestoque: string
  dsestoque: string
}

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss'],
})
export class EstoqueComponent implements OnInit {
  tableData: Array<any>;
  pageSize = 10;
  pageNumber = 1;

  private idunidade
  private idestoque
  private dsestoque
  private unidadeList
  private itemIdUnidade

  constructor(private cadastroservice: CadastroService) { }


  ngOnInit() {
    this.loadData();
    this.loadUnidades()
  }

  loadData() {
    this.cadastroservice.loadEstoque()
      .subscribe(res => {
        this.tableData = res
      }, err => {
        console.log("Error occured");
      });;
  }

  loadUnidades() {
    this.cadastroservice.loadUnidades()
      .subscribe(res => {
        this.unidadeList = res
      }, err => {
        console.log("Error occured");
      });
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  clean() {
    this.idunidade = null
    this.idestoque = null
    this.dsestoque = null
    this.itemIdUnidade = null
  }

  cadastra() {
    if (!this.dsestoque || !this.idunidade) {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Há campos vazios, verifique por favor.',
      });
    } else {
      let estoque = new Estoque();
      estoque.dsestoque = this.dsestoque
      estoque.idestoque = this.idestoque
      estoque.idunidade = this.idunidade
      this.cadastroservice.saveOrUpdateEstoque(estoque).subscribe(res => {
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
    this.idunidade = item.unidade.idUnidade
    this.idestoque = item.idEstoque
    this.dsestoque = item.dsEstoque
    this.itemIdUnidade = item.unidade.idUnidade
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
