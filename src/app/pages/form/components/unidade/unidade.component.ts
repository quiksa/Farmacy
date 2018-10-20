import { CadastroService } from '../../../../services/cadastro.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import swal from 'sweetalert2';
import 'rxjs/add/operator/delay';

class Unidade {
  idunidade: string;
  dsunidade: string;
  nmunidade: string;
  nmreduzido: string;
  cnpj: string;
  idendereco: string;
  bairro: string;
  nmrua: string;
  dscomplemento: string;
}


@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.scss'],
  encapsulation: ViewEncapsulation.None  // Enable dynamic HTML styles
})
export class UnidadeComponent implements OnInit {

  private idunidade = null;
  private dsunidade;
  private idendereco = null;
  private nmunidade;
  private nmreduzido;
  private cnpj;
  private itemIdCidade;
  private bairro;
  private nmrua;
  private dscomplemento;
  private itemIdEstado;
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
    this.itemIdCidade = null;
  }


  ///METODO PARA CADASTRAR

  cadastra() {
    if (!this.dsunidade || !this.nmunidade || !this.nmreduzido || !this.cnpj) {
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
      unidade.dscomplemento = this.dscomplemento
      unidade.bairro = this.bairro
      unidade.nmrua = this.nmrua
      this.cadastroservice.saveOrUpdateUnidade(unidade).subscribe(res => {
        console.log(res);
      }, err => {
        console.log("Error occured");
      })

    }
  }
}
