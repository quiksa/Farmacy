import { CadastroService } from './../../services/cadastro.service';
import { Component, OnInit } from '@angular/core';
import { ChartsService } from '../charts/components/echarts/charts.service';
import swal from 'sweetalert2';

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


  private valorMercadoria;

  public totalValor;
  public desconto;
  public vlMercadoria;
  public subTotal;
  public qtdMercadoria;
  public nmPessoa;
  public idCliente;
  public idMercadoria;
  public nrCpf;
  public clienteList;
  public productList;
  tableData: Array<any>;

  showloading: boolean = false;

  public AnimationBarOption;

  constructor(private _chartsService: ChartsService, private cadastroService : CadastroService) { }

  ngOnInit() {
    this.AnimationBarOption = this._chartsService.getAnimationBarOption();
    this.clienteList=this.loadCliente();
    this.productList=this.loadMercadoria();
  }

  loadMercadoria(){
    this.cadastroService.loadMercadoria().subscribe(res=>{
      this.productList=res.map(data=>{
        data.nmMercadoria = data.nmMercadoria;
        data.vlMercadoria = data.vlMercadoria;
        this.valorMercadoria= data.vlMercadoria;
        //console.log(data.vlMercadoria.toString());
        return data;
      })
    },err=>{
      console.log ("Error occured")
    });
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

  subTotalFunction(){
    if(this.idMercadoria != null || this.qtdMercadoria !=null){
      let a= this.qtdMercadoria;
      let b= this.idMercadoria;
      debugger
      this.subTotal = this.qtdMercadoria * this.vlMercadoria;
      
    }else{
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Há campos vazios, verifique por favor.',
      });
    }

  }

  onFocusFunctionValor(){
    if(this.idMercadoria !=null || this.qtdMercadoria !=null || this.totalValor!=null ||this.subTotal !=null || this.totalValor !=null){
      this.totalValor =(this.subTotal *((100-this.desconto)/100));
    }else{
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Há campos vazios, verifique por favor.',
      });
    }
  }

  eventoLimpar(){
    this.idMercadoria=null;
    this.qtdMercadoria=null;
    this.totalValor = null;
    this.subTotal = null;
  }

}
