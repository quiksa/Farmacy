import { CadastroService } from '../../../../services/cadastro.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import swal from 'sweetalert2';
import 'rxjs/add/operator/delay';


@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss'],
  encapsulation: ViewEncapsulation.None  // Enable dynamic HTML styles
})
export class FuncionarioComponent implements OnInit {

  private nome;
  private email;
  private usuario;
  private senha;
  private rua;
  private complemento;
  private cpf;
  private bairro;
  private nrtelefone;
  private estado;
  private itemIdEstado;
  private itemIdCidade;
  private estadolist;
  private cidadelist;


  //PEGA O ESTADO SELECIONADO E PROCURA AS CIDADES
  public selectedEstado(value: any): void {
    console.log('Selected value is: ', value);
    this.procuraCidades(value);
  }

  public procuraCidades(idEstado) {
    this.cadastroservice.getCidade(idEstado).subscribe(res => {
      this.cidadelist = res
    }, err => {
      console.log("Error occured");
    });
  }

  constructor(private cadastroservice: CadastroService) { }


  ngOnInit() {

    this.cadastroservice.getEstados('')
      .subscribe(res => {
        this.estadolist = res
      }, err => {
        console.log("Error occured");
      });
  }

  clean() {
    this.nome = null;
    this.email = null;
    this.usuario = null;
    this.senha = null;
    this.cpf = null;
    this.nrtelefone = null;
    this.estado = null;
    this.itemIdEstado = null;
    this.itemIdCidade = null;
  }


  ///METODO PARA CADASTRAR

  cadastra() {
    if (!this.cpf || !this.nome || !this.email || !this.usuario || !this.senha || !this.nrtelefone && this.estado) {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Há campos vazios, verifique por favor.',
      });
    } else {
      // this.cadastroservice.saveOrUpdateFuncionario().subscribe(res => {
      //   console.log(res);
      // }, err => {
      //   console.log("Error occured");
      // })

    }
  }
}
