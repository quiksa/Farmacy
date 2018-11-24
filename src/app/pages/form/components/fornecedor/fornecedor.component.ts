import { CadastroService } from '../../../../services/cadastro.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import 'rxjs/add/operator/delay';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


export class Fornecedor {
  idfornecedor: string;
  cnpj: string;
  dsfornecedor: string;
  nrtelefone: string;
  idpessoa: string;
  nmpessoa: string;
  email: string;
  idendereco: string;
  nmrua: string;
  dscomplemento: string;
  bairro: string;
  idcidade: string;
}

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
})
export class FornecedorComponent implements OnInit {

  tableData: Array<any>;
  pageSize = 10;
  pageNumber = 1;
  formulario: FormGroup;

  constructor(private cadastroservice: CadastroService, private formBuilder: FormBuilder, ) {
    //super();
  }

  public idfornecedor;
  public cnpj;
  public dsfornecedor;
  public idpessoa;
  public nmpessoa;
  public nrtelefone;
  public idendereco;
  public nmrua;
  public email;
  public idEstado
  public dscomplemento;
  public bairro;
  public idcidade;
  public cidadeList;
  public estadoList;
  public itemIdEstado;
  public itemIdCidade;


  ngOnInit() {
    this.loadData();
    this.loadFornecedor();
    // this.formulario = this.formBuilder.group({
    //   nmpessoa: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
    //   email: [null, [Validators.required, Validators.email]],
    //   itemIdEstado : [null, [Validators.required]],
    //   //itemIdEstado: new FormControl(null, Validators.required),
    //   //email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
    //   //confirmarEmail: [null, [FormValidations.equalsTo('email')]],

    //   endereco: this.formBuilder.group({
    //     //cep: [null, [Validators.required, FormValidations.cepValidator]],
    //     numero: [null, Validators.required],
    //     complemento: [null],
    //     rua: [null, Validators.required],
    //     bairro: [null, Validators.required],
    //     cidade: [null, Validators.required],
    //     estado: [null, Validators.required]
    //   }),

    //   cargo: [null],
    //   tecnologias: [null],
    //   newsletter: ['s'],
    //   termos: [null, Validators.pattern('true')],
    //   //frameworks: this.buildFrameworks()
    // });
  }
  loadFornecedor() {
    this.cadastroservice.loadFornecedor()
      .subscribe(res => {
        this.tableData = res
      }, err => {
        console.log("Error occured");
      });;
  }


  // submit() {
  //   throw new Error("Method not implemented.");
  // }



  loadData() {
    this.cadastroservice.getEstados('')
      .subscribe(res => {
        this.estadoList = res
      }, err => {
        console.log("Error occured");
      });;

    this.cadastroservice.loadClientes()
      .subscribe(res => {
        this.tableData = res
      }, err => {
        console.log("Error occured");
      });;
  }

  public carregaEstado(value) {
    console.log('dsadsa: ', value);
  }

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

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  clean() {
    this.idfornecedor = null
    this.cnpj = null
    this.dsfornecedor = null
    this.idpessoa = null
    this.nmpessoa = null
    this.nrtelefone = null
    this.idendereco = null
    this.nmrua = null
    this.email = null
    this.dscomplemento = null
    this.bairro = null
    this.idcidade = null
    this.itemIdEstado = null
    this.itemIdCidade = null
    this.idEstado = null
  }


  ///METODO PARA CADASTRAR

  cadastra() {
    if (
      !this.cnpj ||
      !this.dsfornecedor ||
      !this.bairro ||
      !this.nmpessoa ||
      !this.dscomplemento ||
      !this.dsfornecedor ||
      !this.email ||
      !this.itemIdCidade! ||
      !this.nmrua ||
      !this.nrtelefone) {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Há campos vazios, verifique por favor.',
      });
    } else {
      let fornecedor = new Fornecedor()
      fornecedor.idfornecedor = this.idfornecedor
      fornecedor.bairro = this.bairro
      fornecedor.cnpj = this.cnpj
      fornecedor.dscomplemento = this.dscomplemento
      fornecedor.dsfornecedor = this.dsfornecedor
      fornecedor.idcidade = this.itemIdCidade
      fornecedor.idendereco = this.idendereco
      fornecedor.idpessoa = this.idpessoa;
      fornecedor.nmpessoa = this.nmpessoa
      fornecedor.nmrua = this.nmrua
      fornecedor.email = this.email
      fornecedor.nrtelefone = this.nrtelefone
      this.cadastroservice.saveOrUpdateFornecedor(fornecedor).subscribe(res => {
        let newItem = (JSON.parse(res._body))
        let updateItem = this.tableData.find(this.findIndexToUpdate, newItem.idFornecedor);
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
    return newItem.idFornecedor === this;
  }

  editar(item) {
    this.idfornecedor = item.idFornecedor;
    this.nmpessoa = item.pessoa.nmPessoa
    this.bairro = item.pessoa.endereco.bairro
    this.cnpj = item.cnpj
    this.dscomplemento = item.pessoa.endereco.dsComplemento
    this.dsfornecedor = item.dsFornecedor
    this.email = item.pessoa.email
    this.nrtelefone = item.pessoa.nrtelefone
    this.nmrua = item.pessoa.endereco.nmRua
    this.itemIdCidade = item.pessoa.endereco.cidade.idCidade
    this.idendereco = item.pessoa.endereco.idEndereco
    this.idpessoa = item.pessoa.idPessoa
    this.itemIdEstado = item.pessoa.endereco.cidade.estado.idEstado
    this.procuraCidades(this.itemIdEstado)
  }

  excluir(item) {
    swal({
      title: 'Excluir Fornecedor',
      text: 'Tem certeza que deseja excluir o Fornecedor?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Excluir!'
    }).then((result) => {
      if (result.value) {
        this.cadastroservice.deleteFornecedor(item.idFornecedor).subscribe(res => {
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
