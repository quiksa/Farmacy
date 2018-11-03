import { CadastroService } from '../../../../services/cadastro.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import swal from 'sweetalert2';
import 'rxjs/add/operator/delay';

export class Unidade {
  idunidade: string;
  dsunidade: string;
  nmunidade: string;
  nmreduzido: string;
  bairro: string;
  dscomplemento: string;
  nmrua: string;
  cnpj: string;
  idendereco: string;
  idcidade: string;
}

@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.scss'],
  encapsulation: ViewEncapsulation.None  // Enable dynamic HTML styles
})
export class UnidadeComponent implements OnInit {
  tableData: Array<any>;
  pageSize = 10;
  pageNumber = 1;

  private idunidade = null;
  private dsunidade;
  private idendereco = null;
  private nmunidade;
  private nmreduzido;
  private cnpj;
  private idcidade;
  private bairro;
  private nmrua;
  private dscomplemento;
  private itemIdEstado;
  private estadoList;
  private cidadeList;

  constructor(private cadastroservice: CadastroService) { }

  //PEGA O ESTADO SELECIONADO E PROCURA AS CIDADES
  public selectedEstado(value: any): void {
    console.log('Selected value is: ', value);
    this.procuraCidades(value);
  }

  public procuraCidades(idEstado) {
    this.cadastroservice.getCidade(idEstado).subscribe(res => {
      this.cidadeList = res
    }, err => {
      console.log("Error occured");
    });
  }

  public loadEstados() {
    this.cadastroservice.getEstados('')
      .subscribe(res => {
        this.estadoList = res
      }, err => {
        console.log("Error occured");
      });
  }

  ngOnInit() {
    this.loadData();
    this.loadEstados();
  }

  loadData() {
    this.cadastroservice.loadUnidades()
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
    this.idunidade = null;
    this.idendereco = null;
    this.dsunidade = null;
    this.nmunidade = null;
    this.nmreduzido = null;
    this.nmrua = null;
    this.cnpj = null;
    this.bairro = null;
    this.dscomplemento = null;
    this.itemIdEstado = null;
    this.idcidade = null;
  }


  ///METODO PARA CADASTRAR

  cadastra() {
    if (!this.dsunidade || !this.idcidade || !this.nmunidade || !this.nmreduzido || !this.cnpj) {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Há campos vazios, verifique por favor.',
      });
    } else {
      let unidade = new Unidade();
      unidade.cnpj = this.cnpj
      unidade.dsunidade = this.dsunidade
      unidade.idendereco = this.idendereco
      unidade.idunidade = this.idunidade
      unidade.nmreduzido = this.nmreduzido
      unidade.nmunidade = this.nmunidade
      unidade.idcidade = this.idcidade
      unidade.bairro = this.bairro
      unidade.dscomplemento = this.dscomplemento
      unidade.nmrua = this.nmrua
      this.cadastroservice.saveOrUpdateUnidade(unidade).subscribe(res => {
        let newItem = (JSON.parse(res._body))
        let updateItem = this.tableData.find(this.findIndexToUpdate, newItem.idUnidade);
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
    return newItem.idUnidade === this;
  }

  editar(item) {
    this.idunidade = item.idUnidade;
    this.dsunidade = item.dsUnidade;
    this.nmunidade = item.nmUnidade
    this.nmreduzido = item.nmRduzido
    this.bairro = item.endereco.bairro;
    this.dscomplemento = item.endereco.dsComplemento;
    this.nmrua = item.endereco.nmRua;
    this.cnpj = item.cnpj;
    this.idendereco = item.endereco.idEndereco;
    this.idcidade = item.endereco.cidade.idCidade;
    this.itemIdEstado = item.endereco.cidade.estado.idEstado;
    this.procuraCidades(this.itemIdEstado)
  }

  excluir(item) {
    swal({
      title: 'Excluir Unidade',
      text: 'Tem certeza que deseja excluir a unidade?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Excluir!'
    }).then((result) => {
      if (result.value) {
        this.cadastroservice.deleteUnidade(item.idUnidade).subscribe(res => {
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
