import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './form.routing';
import { SharedModule } from '../../shared/shared.module';
import { FileUploadModule } from 'ng2-file-upload';
import { SelectModule } from 'ng2-select';

/* components */
import { FormComponent } from './form.component';
import { FormInputsComponent } from './components/form-inputs/form-inputs.component';
import { FormLayoutsComponent } from './components/form-layouts/form-layouts.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { Ng2SelectComponent } from './components/ng2-select/ng2-select.component';
import { SingleSelectComponent } from './components/ng2-select/single-select/single-select.component';
import { MultipleSelectComponent } from './components/ng2-select/multiple-select/multiple-select.component';
import { ChildrenSelectComponent } from './components/ng2-select/children-select/children-select.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { FuncionarioComponent } from './components/funcionario/funcionario.component';
import { UnidadeComponent } from './components/unidade/unidade.component';
import { CargoComponent } from './components/cargo/cargo.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FornecedorComponent } from './components/fornecedor/fornecedor.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { MercadoriaComponent } from './components/mercadoria/mercadoria.component';
import { MovimentoEstoqueComponent } from './components/movimentoestoque/movimentoestoque.component';
import { TextMaskModule } from 'angular2-text-mask';
import { FormaPagamentoComponent } from './components/formapagamento/formapagamento.component';
import { SaidaEstoqueComponent } from './components/saidaestoque/saidaestoque.component';
import { CpfPipe } from './cpf.pipe';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FileUploadModule,
        SelectModule,
        NgxSelectModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        routing,
        TextMaskModule,
    ],
    declarations: [
        FormComponent,
        FormInputsComponent,
        FormLayoutsComponent,
        FileUploadComponent,
        Ng2SelectComponent,
        SingleSelectComponent,
        MultipleSelectComponent,
        ChildrenSelectComponent,
        ClienteComponent,
        FuncionarioComponent,
        UnidadeComponent,
        CargoComponent,
        FornecedorComponent,
        FormaPagamentoComponent,
        CategoriaComponent,
        MercadoriaComponent,
        MovimentoEstoqueComponent,
        SaidaEstoqueComponent,
        CpfPipe
    ]
})
export class FormModule { }
