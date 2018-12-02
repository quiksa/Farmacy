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


  public valorMercadoria;
  public pageSize = 10;
  public pageNumber = 1;
  public totalValor;
  public desconto = 0;
  public vlUnitario;
  public subTotal;
  public qtdMercadoria;
  public nmPessoa;
  public idCliente;
  public nmMercadoria
  public idMercadoria;
  public id;
  public nrCpf;
  public clienteList;
  public productList;
  public tableData: Array<any>;

  showloading: boolean = false;

  public AnimationBarOption;

  constructor(private _chartsService: ChartsService, private cadastroService: CadastroService) { }

  ngOnInit() {
    this.tableData = new Array
    this.AnimationBarOption = this._chartsService.getAnimationBarOption();
    this.clienteList = this.loadCliente();
    this.productList = this.loadMercadoria();
  }

  loadMercadoria() {
    this.cadastroService.loadMercadoria().subscribe(res => {
      this.productList = res.map((data, index) => {
        data.nmMercadoria = data.nmMercadoria;
        data.vlMercadoria = data.vlMercadoria;
        data.index = index
        this.valorMercadoria = data.vlMercadoria;
        return data;
      })
    }, err => {
      console.log("Error occured")
    });
  }

  loadCliente() {
    this.cadastroService.loadClientes().subscribe(res => {
      this.clienteList = res.map(data => {
        data.nmPessoa = data.pessoa.nmPessoa;
        data.nrCpf = data.nrcpf;
        return data
      })
    }, err => {
      console.log("Error Occured")
    });
  }

  subTotalFunction() {
    this.subTotal = this.qtdMercadoria * this.vlUnitario;
  }

  calculaValor() {
    this.totalValor = (this.subTotal * ((100 - this.desconto) / 100));
  }

  eventoLimpar() {
    this.idMercadoria = null;
    this.qtdMercadoria = null;
    this.totalValor = null;
    this.subTotal = null;
    this.desconto = 0
  }

  selecionaItem(index) {
    this.id = this.productList[index].idMercadoria
    this.vlUnitario = this.productList[index].vlMercadoria
    this.nmMercadoria = this.productList[index].nmMercadoria
    this.subTotalFunction()
    this.calculaValor()
  }

  onKey(event) {
    this.subTotalFunction()
    this.calculaValor()
  }

  addCarinho() {
    let item = {
      idMercadoria: this.id,
      quantidade: this.qtdMercadoria,
      mercadoria: this.nmMercadoria,
      total: this.totalValor,
    }
    this.tableData.push(item)
    this.eventoLimpar()
  }

  editar(item) {
    this.idMercadoria = item.idMercadoria
    debugger
  }

  excluir(item) {
    this.tableData.splice(this.tableData.indexOf(item), 1)
  }

  loadData() {

  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

}
