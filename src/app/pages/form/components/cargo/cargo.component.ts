import { CadastroService } from '../../../../services/cadastro.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import 'rxjs/add/operator/delay';

export class Cargo {
  idcargo: string;
  nmcargo: string;
  dscargo: string;
}

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.scss']
})
export class CargoComponent implements OnInit {
  tableData: Array<any>;
  pageSize = 10;
  pageNumber = 1;

  constructor(private cadastroservice: CadastroService) { }

  public idcargo;
  public nmcargo;
  public dscargo;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.cadastroservice.loadCargos()
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
    this.idcargo = null;
    this.nmcargo = null;
    this.dscargo = null;
  }


  ///METODO PARA CADASTRAR

  cadastra() {
    if (!this.nmcargo || !this.dscargo) {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Há campos vazios, verifique por favor.',
      });
    } else {
      let cargo = new Cargo();
      cargo.idcargo = this.idcargo;
      cargo.nmcargo = this.nmcargo;
      cargo.dscargo = this.dscargo;

      this.cadastroservice.saveOrUpdateCargo(cargo).subscribe(res => {
        let newItem = (JSON.parse(res._body))
        let updateItem = this.tableData.find(this.findIndexToUpdate, newItem.idCargo);
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
    return newItem.idCargo === this;
  }

  editar(item) {
    this.idcargo = item.idCargo;
    this.nmcargo = item.nmCargo;
    this.dscargo = item.dsCargo;
  }

  excluir(item) {
    swal({
      title: 'Excluir Cargo',
      text: 'Tem certeza que deseja excluir o Cargo?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Excluir!'
    }).then((result) => {
      if (result.value) {
        this.cadastroservice.deleteCargo(item.idCargo).subscribe(res => {
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
