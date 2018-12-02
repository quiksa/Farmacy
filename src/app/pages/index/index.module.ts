import { NgxSelectModule } from 'ngx-select-ex';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './index.routing';
import { SharedModule } from '../../shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { IndexComponent } from './index.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        NgxSelectModule,
        FormsModule,
        CommonModule,
        SharedModule,
        NgxEchartsModule,
        NgxPaginationModule,
        routing
    ],
    declarations: [
        IndexComponent
    ]
})
export class IndexModule { }
