import { CadastroService } from './../../services/cadastro.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {



  private nome;
  private email;
  private usuario;
  private senha;
  private cpf;
  private nrtelefone;
  private estado;
  
  private vrcidade;

  public item: Map<String, String>

  public estadolist: Array<String> = ['Acre','Alagoas','Amapá','Amazonas','Bahia'
  ,'Ceará','Distrito Federal','Espírito Santo','Goiás','Maranhão','Mato Grosso','Mato Grosso do Sul',
'Minas Gerais','Pará','Paraíba','Paraná','Pernanbuco','Piauí','Rio de Janeiro','Rio Grande do Norte',
'Rio Grande do Sul','Rondônia','Santa Catarina','São Paulo','Sergipe','Tocantins'];

  public items:Array<String>=[];


//  public items: Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
//  'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
//  'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
//  'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
//  'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
//  'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
//  'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
//  'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
//  'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
//  'Zagreb', 'Zaragoza', 'Łódź'];

  public value: any = {}; 
  public _disabledV: string = '0';
  public disabled: boolean = false;



  //PEGA O ESTADO SELECIONADO E PROCURA AS CIDADES
  public selectedEstado(value: any): void {
    console.log('Selected value is: ', value);
    let vrestado = value.text;
    this.procuraCidades(vrestado);  
  }

  public procuraCidades(estado){
    let listacidades = this.cadastroservice.getCidade(estado);


  }

  public selectedCidade(value: any): void {
    console.log('Selected value is: ', value);
    this.vrcidade = value.text;
  }


  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }

  constructor(private cadastroservice: CadastroService) { }


  ngOnInit() {
    let item = new Map();
    item.set("A", 1);
    item.set("B", 2);
    item.set("C", 3);

  }


  ///METODO PARA CADASTRAR

  cadastra(){
    if(!this.cpf || !this.nome || !this.email || !this.usuario 
      || !this.senha || !this.nrtelefone && this.estado){
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Há campos vazios, verifique por favor.',
      });
    }else{
      

    }
  }
}
