import { CadastroService } from '../../../../services/cadastro.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import swal from 'sweetalert2';
import 'rxjs/add/operator/delay';

export class Cliente {
  idcliente: string;
  idpessoa: string;
  nmpessoa: string;
  email: string;
  nrcpf: string;
  nrtelefone: string;
  idendereco: string;
  dtnascimento: string;
  sgsexo: string;
  bairro: string;
  nmrua: string;
  dscomplemento: string;
  idcidade: string;
}

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public mask = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  public phone = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public date = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]

  tableData: Array<any>;
  pageSize = 10;
  pageNumber = 1;

  public sgsexo;
  public idpessoa;
  public idendereco;
  public idCliente;
  public nmpessoa;
  public email;
  public nmrua;
  public dscomplemento;
  public dtnascimento;
  public nrcpf;
  public bairro;
  public nrtelefone;
  public itemIdEstado;
  public itemIdCidade;
  public estadoList;
  public cidadeList;


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

  constructor(private cadastroservice: CadastroService) { }


  ngOnInit() {
    this.loadData();
    this.cadastroservice.getEstados('')
      .subscribe(res => {
        this.estadoList = res
      }, err => {
        console.log("Error occured");
      });
  }

  clean() {
    this.nmpessoa = null;
    this.email = null;
    this.nrcpf = null;
    this.nrtelefone = null;
    this.itemIdEstado = null;
    this.itemIdCidade = null;
    this.sgsexo = null;
    this.dscomplemento = null;
    this.dtnascimento = null;
    this.idCliente = null;
    this.idendereco = null;
    this.idpessoa = null;
    this.nmrua = null;
    this.bairro = null;
  }


  loadData() {
    this.cadastroservice.loadClientes()
      .subscribe(res => {
        this.tableData = res
        debugger
      }, err => {
        console.log("Error occured");
      });;
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  ///METODO PARA CADASTRAR
  cadastra() {
    if (!this.nrcpf || !this.nmpessoa || !this.email || !this.nrtelefone || !this.dtnascimento || !this.sgsexo || !this.bairro || !this.dscomplemento || !this.email || !this.itemIdCidade) {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Há campos vazios, verifique por favor.',
      });
    } else {
      let cliente = new Cliente()
      cliente.bairro = this.bairro
      cliente.dtnascimento = this.dtnascimento;
      debugger
      cliente.dscomplemento = this.dscomplemento;
      cliente.email = this.email;
      cliente.idcidade = this.itemIdCidade;
      cliente.idcliente = this.idCliente;
      cliente.idendereco = this.idendereco;
      cliente.idpessoa = this.idpessoa;
      cliente.nmpessoa = this.nmpessoa;
      cliente.nmrua = this.nmrua;
      cliente.nrcpf = this.nrcpf.replace(/\D/g,'');
      cliente.sgsexo = this.sgsexo;
      cliente.nrtelefone = this.nrtelefone.replace(/\D/g,'');
      this.cadastroservice.saveOrUpdateCliente(cliente).subscribe(res => {
        let newItem = (JSON.parse(res._body))
        let updateItem = this.tableData.find(this.findIndexToUpdate, newItem.idCliente);
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
    return newItem.idCliente === this;
  }

  editar(item) {
    this.sgsexo = item.pessoa.sgsexo
    this.idpessoa = item.pessoa.idPessoa
    this.idendereco = item.pessoa.endereco.idEndereco
    this.idCliente = item.idCliente
    this.nmpessoa = item.pessoa.nmPessoa
    this.email = item.pessoa.email
    this.nmrua = item.pessoa.endereco.nmRua
    this.dscomplemento = item.pessoa.endereco.dsComplemento
    this.dtnascimento = item.pessoa.dtnascimento
    this.nrcpf = item.nrcpf
    this.bairro = item.pessoa.endereco.bairro
    this.nrtelefone = item.pessoa.nrtelefone
    this.itemIdEstado = item.pessoa.endereco.cidade.estado.idEstado
    this.itemIdCidade = item.pessoa.endereco.cidade.idCidade
    this.procuraCidades(this.itemIdEstado)
  }

  excluir(item) {
    swal({
      title: 'Excluir Cliente',
      text: 'Tem certeza que deseja excluir o Cliente?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Excluir!'
    }).then((result) => {
      if (result.value) {
        this.cadastroservice.deleteCliente(item.idCliente).subscribe(res => {
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
