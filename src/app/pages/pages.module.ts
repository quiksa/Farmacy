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
import { CadastroComponent } from './cadastro/cadastro.component';
import { SelectModule } from 'ng2-select';

@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        SharedModule,
        routing,
        FormsModule,
        HttpModule,
        SelectModule
    ],
    providers: [LoginService],
    declarations: [
        PagesComponent,
        LoginComponent,
        CadastroComponent
    ]
})
export class PagesModule { }
