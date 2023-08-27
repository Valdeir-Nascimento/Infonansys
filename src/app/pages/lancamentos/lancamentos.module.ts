import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from 'src/app/shared/shared.module';
import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';
import { LancamentoListComponent } from './lancamento-list/lancamento-list.component';
import { LancamentoRoutingModule } from './lancamentos-routing.module';


@NgModule({
    declarations: [
        LancamentoListComponent,
        LancamentoFormComponent,
    ],
    imports: [
        SharedModule,
        LancamentoRoutingModule,
        ReactiveFormsModule,
        CalendarModule,
        IMaskModule,
    ]
})
export class LancamentosModule { }
