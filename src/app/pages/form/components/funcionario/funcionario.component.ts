import { CadastroService } from '../../../../services/cadastro.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import swal from 'sweetalert2';
import 'rxjs/add/operator/delay';
import { Md5 } from 'ts-md5/dist/md5';

export class Funcionario {
  idfuncionario: string;
  idunidade: string;
  idcargo: string;
  usuario: string;
  senha: string | Int32Array;
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
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss']
})
export class FuncionarioComponent implements OnInit {

  tableData: Array<any>;
  pageSize = 10;
  pageNumber = 1;

  private sgsexo;
  private idpessoa;
  private idunidade;
  private idfuncionario;
  private idcargo;
  private idendereco;
  private idCliente;
  private nmpessoa;
  private usuario;
  private senha;
  private email;
  private nmrua;
  private dscomplemento;
  private dtnascimento;
  private nrcpf;
  private bairro;
  private nrtelefone;
  private itemIdEstado;
  private itemIdCidade;
  private passaux;
  private estadoList;
  private cidadeList;
  private cargoList;
  private itemCargo;
  private unidadeList;


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
    this.loadFuncionarios();
    this.loadEstados()
    this.loadCargos()
    this.loadUnidades()
  }

  loadEstados() {
    this.cadastroservice.getEstados('')
      .subscribe(res => {
        this.estadoList = res
      }, err => {
        console.log("Error occured");
      });
  }

  loadFuncionarios() {
    this.cadastroservice.loadFuncionarios()
      .subscribe(res => {
        this.tableData = res
      }, err => {
        console.log("Error occured");
      });
  }

  loadCargos() {
    this.cadastroservice.loadCargos()
      .subscribe(res => {
        this.cargoList = res
      }, err => {
        console.log("Error occured");
      });
  }

  loadUnidades() {
    this.cadastroservice.loadUnidades()
      .subscribe(res => {
        this.unidadeList = res
      }, err => {
        console.log("Error occured");
      });
  }

  clean() {
    this.nmpessoa = null
    this.email = null
    this.usuario = null
    this.senha = null
    this.nrcpf = null
    this.nmrua = null
    this.sgsexo = null
    this.bairro = null
    this.dscomplemento = null
    this.dtnascimento = null
    this.idendereco = null
    this.idpessoa = null
    this.idcargo = null
    this.idunidade = null
    this.nrtelefone = null
    this.itemIdEstado = null
    this.idfuncionario = null
    this.itemIdCidade = null
    this.passaux = null
  }

  editar(item) {
    this.sgsexo = item.pessoa.sgsexo
    this.idpessoa = item.pessoa.idPessoa
    this.idendereco = item.pessoa.endereco.idEndereco
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
    this.usuario = item.login
    this.idfuncionario = item.idFuncionario
    this.idcargo = item.cargo.idCargo
    this.idunidade = item.unidade.idUnidade
    this.passaux = item.senha
    this.senha = item.senha
    this.procuraCidades(this.itemIdEstado)
  }

  findIndexToUpdate(newItem) {
    return newItem.idFuncionario === this;
  }

  ///METODO PARA CADASTRAR
  cadastra() {
    if (!this.idunidade ||
      !this.idcargo ||
      !this.nrcpf ||
      !this.nmpessoa ||
      !this.email ||
      !this.nrtelefone ||
      !this.dtnascimento ||
      !this.sgsexo ||
      !this.bairro ||
      !this.dscomplemento ||
      !this.itemIdCidade) {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Há campos vazios, verifique por favor.',
      });
    } else {
      let funcionario = new Funcionario()
      funcionario.idcargo = this.idcargo
      funcionario.idcidade = this.itemIdCidade
      funcionario.idendereco = this.idendereco
      funcionario.idfuncionario = this.idfuncionario
      funcionario.idpessoa = this.idpessoa
      funcionario.idunidade = this.idunidade
      funcionario.bairro = this.bairro
      funcionario.dscomplemento = this.dscomplemento
      funcionario.dtnascimento = this.dtnascimento
      funcionario.email = this.email
      funcionario.nmpessoa = this.nmpessoa
      funcionario.nmrua = this.nmrua
      funcionario.nrcpf = this.nrcpf
      funcionario.nrtelefone = this.nrtelefone
      if (this.senha != this.passaux) {
        let passmd5 = Md5.hashStr(this.senha)
        funcionario.senha = passmd5;
      } else {
        funcionario.senha = this.senha;
      }
      funcionario.sgsexo = this.sgsexo
      funcionario.usuario = this.usuario
      this.cadastroservice.saveOrUpdateFuncionario(funcionario).subscribe(res => {
        let newItem = (JSON.parse(res._body))
        let updateItem = this.tableData.find(this.findIndexToUpdate, newItem.idFuncionario);
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

  excluir(item) {
    console.log(item)
  }
}
