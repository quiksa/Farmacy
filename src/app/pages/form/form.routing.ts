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
            { path: 'form-cargo', component: CargoComponent }
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
