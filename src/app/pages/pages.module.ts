import { CadastroService } from './../services/cadastro.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';

import { LayoutModule } from '../shared/layout.module';
import { SharedModule } from '../shared/shared.module';

/* components */
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { HttpModule } from '@angular/http';
import { SelectModule } from 'ng2-select';
import { NgxSelectModule } from 'ngx-select-ex';
import { IndexModule } from './index/index.module';
import { ActivateGuard } from '../services/activate-guard.service';

@NgModule({
    imports: [
        IndexModule,
        CommonModule,
        LayoutModule,
        SharedModule,
        routing,
        FormsModule,
        HttpModule,
        SelectModule,
        NgxSelectModule
    ],
    providers: [LoginService, CadastroService, ActivateGuard],
    declarations: [
        PagesComponent,
        LoginComponent,
    ]
})
export class PagesModule { }
