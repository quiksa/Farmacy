import { CadastroService } from '../../../../services/cadastro.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-saidaoestoque',
  templateUrl: './saidaestoque.component.html',
  styleUrls: ['./saidaestoque.component.scss'],
})
export class SaidaEstoqueComponent implements OnInit {

  tableData: Array<any>;
  pageSize = 10;
  pageNumber = 1;

  constructor(private cadastroservice: CadastroService) { }


  ngOnInit() {
    this.loadSaidaEstoque()
  }

  loadSaidaEstoque() {
    this.cadastroservice.loadSaidaEstoque()
      .subscribe(res => {
        this.tableData = res
        debugger
      }, err => {
        console.log("Error occured");
      });
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  findIndexToUpdate(newItem) {
    return newItem.idEstoque === this;
  }

  loadData() {

  }
}
