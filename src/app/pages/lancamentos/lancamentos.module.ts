import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LancamentoListComponent } from './lancamento-list/lancamento-list.component';
import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';

@NgModule({
    declarations: [
        LancamentoListComponent,
        LancamentoFormComponent
    ],
    imports: [
        CommonModule
    ]
})
export class LancamentosModule { }
