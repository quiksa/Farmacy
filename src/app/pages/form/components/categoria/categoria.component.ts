import { CadastroService } from '../../../../services/cadastro.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import swal from 'sweetalert2';
import 'rxjs/add/operator/delay';

export class Categoria {
  idcategoria: string
  nmcategoria: string
  dscategoria: string
}

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit {

  tableData: Array<any>;
  pageSize = 10;
  pageNumber = 1;

  private idcategoria
  private nmcategoria
  private dscategoria

  constructor(private cadastroservice: CadastroService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.cadastroservice.loadCategoria()
      .subscribe(res => {
        this.tableData = res
      }, err => {
        console.log("Error occured");
      });;
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  clean() {
    this.idcategoria = null;
    this.dscategoria = null;
    this.nmcategoria = null;
  }


  ///METODO PARA CADASTRAR

  cadastra() {
    if (!this.dscategoria || !this.nmcategoria) {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Há campos vazios, verifique por favor.',
      });
    } else {
      let categoria = new Categoria();
      categoria.idcategoria = this.idcategoria
      categoria.dscategoria = this.dscategoria
      categoria.nmcategoria = this.nmcategoria
      this.cadastroservice.saveOrUpdateCategoria(categoria).subscribe(res => {
        let newItem = (JSON.parse(res._body))
          let updateItem = this.tableData.find(this.findIndexToUpdate, newItem.idCategoria);
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
    return newItem.idCategoria === this;
  }

  editar(item) {
    this.idcategoria = item.idCategoria
    this.nmcategoria = item.nmCategoria
    this.dscategoria = item.dsCategoria
  }

  excluir(item) {
    swal({
      title: 'Excluir Categoria',
      text: 'Tem certeza que deseja excluir a unidade?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Excluir!'
    }).then((result) => {
      if (result.value) {
        this.cadastroservice.deleteCategoria(item.idCategoria).subscribe(res => {
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
