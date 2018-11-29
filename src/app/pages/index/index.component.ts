import { CadastroService } from './../../services/cadastro.service';
import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../charts/components/echarts/charts.service';  

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
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [ChartsService]
})
export class IndexComponent implements OnInit {

  public nmPessoa;
  public idCliente;
  public nrCpf;
  public clienteList;
  tableData: Array<any>;
  //tup =[,];

  showloading: boolean = false;

  public AnimationBarOption;

  constructor(private _chartsService: ChartsService, private cadastroService : CadastroService) { }

  ngOnInit() {
    this.AnimationBarOption = this._chartsService.getAnimationBarOption();
    this.clienteList=this.loadCliente();
    debugger
  }

  loadCliente(){

    this.cadastroService.loadClientes().subscribe(res=>{
      this.clienteList = res.map(data =>{
        data.nmPessoa = data.pessoa.nmPessoa;
        data.nrCpf = data.nrcpf;
        //this.tup = [data.nmPessoa,data.nrCpf];
        //console.log(this.tup);
        return data
      })
    }, err=>{
      console.log("Error Occured")
    });
  }

}
