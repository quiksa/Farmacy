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
  public idEstoque
  public idUsuario = sessionStorage.getItem('idUsuario')
  public idUnidade = sessionStorage.getItem('idUnidade')
  public formaPagamentoList
  public idFormaPagamento
  public pageSize = 10;
  public pageNumber = 1;
  public totalValor;
  public totalPedido
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
    this.formaPagamentoList = this.loadFormaPagamento()
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

  loadFormaPagamento() {
    this.cadastroService.loadFormaPagamento().subscribe(res => {
      this.formaPagamentoList = res
    }, err => {
      console.log("Error occured")
    });
  }

  subTotalFunction() {
    if(this.qtdMercadoria && this.vlUnitario){
      this.subTotal = (this.qtdMercadoria * this.vlUnitario).toFixed(2);
    }
  }

  calculaValor() {
    if(this.subTotal){
      this.totalValor = (this.subTotal * ((100 - this.desconto) / 100)).toFixed(2);
    }
  }

  cancelarCompra() {
    this.idMercadoria = null;
    this.qtdMercadoria = null;
    this.totalValor = null;
    this.subTotal = null;
    this.idFormaPagamento = null
    this.desconto = 0
    this.id = null
    this.idCliente = null
    this.totalPedido = null
    this.tableData = []
  }

  eventoLimpar() {
    this.idMercadoria = null;
    this.vlUnitario = null
    this.qtdMercadoria = null;
    this.totalValor = null;
    this.subTotal = null;
    this.desconto = 0
    this.id = null
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
    if (this.id != null && this.qtdMercadoria) {
      let item = {
        idMercadoria: this.id,
        quantidade: this.qtdMercadoria,
        desconto: this.desconto,
        mercadoria: this.nmMercadoria,
        total: this.totalValor,
      }
      this.tableData.push(item)
      this.eventoLimpar()
      this.calculaTotalPedido()
    }

  }

  editar(item) {
    this.idMercadoria = item.idMercadoria
  }

  calculaTotalPedido() {
    this.totalPedido = 0
    this.totalPedido = this.tableData.reduce(this.getSum,0)
  }

  getSum(total, num) {
    return total + parseFloat(num.total);
  }

  excluir(item) {
    this.tableData.splice(this.tableData.indexOf(item), 1)
    this.calculaTotalPedido()
  }

  loadData() {

  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }

  confirmVenda() {
    let mercadoriaList: Array<any> = []
    this.tableData.forEach(element => {
      let data = {
        idMercadoria: element.idMercadoria,
        desconto: element.desconto,
        quantidade: element.quantidade
      }
      mercadoriaList.push(data)
    });
    debugger
    if (mercadoriaList.length > 0 && this.idCliente && this.idFormaPagamento) {
      this.cadastroService.doVenda(mercadoriaList, this.idCliente, this.idFormaPagamento, this.idUsuario, this.idUnidade).subscribe(res => {
        debugger
        swal({
          type: 'success',
          text: 'Compra realizada com sucesso!',
        });
        this.cancelarCompra()
      }, err => {
        debugger
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Verifique os parametros!',
        });
      })
    } else {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Verifique os parametros!',
      });
    }
  }

  cancelarVenda() {
    swal({
      title: 'Tem certeza que deseja cancelar a compra?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, cancelar!'
    }).then((result) => {
      if (result.value) {
        this.cancelarCompra()
      }
    });
  }

}
