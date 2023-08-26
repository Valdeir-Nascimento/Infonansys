import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LancamentoListComponent } from './lancamento-list/lancamento-list.component';
import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';
import { LancamentoRoutingModule } from './lancamentos-routing.module';
import { IMaskModule } from 'angular-imask';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
    declarations: [
        LancamentoListComponent,
        LancamentoFormComponent
    ],
    imports: [
        CommonModule,
        LancamentoRoutingModule,
        ReactiveFormsModule,
        CalendarModule,
        IMaskModule
    ]
})
export class LancamentosModule { }
