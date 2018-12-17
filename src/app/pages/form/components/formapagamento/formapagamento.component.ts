import { CadastroService } from '../../../../services/cadastro.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import swal from 'sweetalert2';
import 'rxjs/add/operator/delay';

export class FormaPagamento {
  idformapagamento: string
  dsformapagamento: string
  dstipopagamento: string
}

@Component({
  selector: 'app-formapagamento',
  templateUrl: './formapagamento.component.html',
  styleUrls: ['./formapagamento.component.scss'],
})
export class FormaPagamentoComponent implements OnInit {
  tableData: Array<any>;
  pageSize = 10;
  pageNumber = 1;

  public idformapagamento
  public dsformapagamento
  public dstipopagamento

  constructor(private cadastroservice: CadastroService) { }


  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.cadastroservice.loadFormaPagamento()
      .subscribe(res => {
        this.tableData = res
      }, err => {
        console.log("Error occured");
      });
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  clean() {
    this.idformapagamento = null
    this.dsformapagamento = null
    this.dstipopagamento = null
  }

  cadastra() {
    if (!this.dsformapagamento || !this.dstipopagamento) {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Há campos vazios, verifique por favor.',
      });
    } else {
      let forma = new FormaPagamento();
      forma.dsformapagamento = this.dsformapagamento
      forma.idformapagamento = this.idformapagamento
      forma.dstipopagamento = this.dstipopagamento
      this.cadastroservice.saveOrUpdateFormaPagamento(forma).subscribe(res => {
        let newItem = (JSON.parse(res._body))
        let updateItem = this.tableData.find(this.findIndexToUpdate, newItem.idFormaPagamento);
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
    return newItem.idFormaPagamento === this;
  }

  editar(item) {
    this.idformapagamento = item.idFormaPagamento
    this.dsformapagamento = item.dsFormaPagamento
    this.dstipopagamento = item.dsTipoPagamento
  }

  excluir(item) {
    swal({
      title: 'Excluir Forma Pagamento',
      text: 'Tem certeza que deseja excluir a Forma de Pagamento?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Excluir!'
    }).then((result) => {
      if (result.value) {
        this.cadastroservice.deleteFormaPagamento(item.idFormaPagamento).subscribe(res => {
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
