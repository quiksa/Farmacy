import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form.component';
import { FormInputsComponent } from './components/form-inputs/form-inputs.component';
import { FormLayoutsComponent } from './components/form-layouts/form-layouts.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { Ng2SelectComponent } from './components/ng2-select/ng2-select.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { FuncionarioComponent } from './components/funcionario/funcionario.component';
import { UnidadeComponent } from './components/unidade/unidade.component';
import { CargoComponent } from './components/cargo/cargo.component';
import { FornecedorComponent } from './components/fornecedor/fornecedor.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { MercadoriaComponent } from './components/mercadoria/mercadoria.component';
import { MovimentoEstoqueComponent } from './components/movimentoestoque/movimentoestoque.component';
import { FormaPagamentoComponent } from './components/formapagamento/formapagamento.component';
import { SaidaEstoqueComponent } from './components/saidaestoque/saidaestoque.component';

const childRoutes: Routes = [
    {
        path: '',
        component: FormComponent,
        children: [
            { path: '', redirectTo: 'inputs', pathMatch: 'full' },
            { path: 'form-inputs', component: FormInputsComponent },
            { path: 'form-layouts', component: FormLayoutsComponent },
            { path: 'file-upload', component: FileUploadComponent },
            { path: 'ng2-select', component: Ng2SelectComponent },
            { path: 'form-cliente', component: ClienteComponent },
            { path: 'form-funcionario', component: FuncionarioComponent },
            { path: 'form-unidade', component: UnidadeComponent },
            { path: 'form-cargo', component: CargoComponent },
            { path: 'form-fornecedor', component: FornecedorComponent },
            { path: 'form-formapagamento', component: FormaPagamentoComponent },
            { path: 'form-categoria', component: CategoriaComponent },
            { path: 'form-mercadoria', component: MercadoriaComponent },
            { path: 'form-movimentoestoque', component: MovimentoEstoqueComponent },
            { path: 'form-saidaestoque', component: SaidaEstoqueComponent },
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
