import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LancamentoListComponent } from './lancamento-list/lancamento-list.component';
import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';

const routes: Routes = [
    {
        path: '',
        component: LancamentoListComponent
    },
    {
        path: 'cadastrar',
        component: LancamentoFormComponent
    },
    {
        path: ':id/editar',
        component: LancamentoFormComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LancamentoRoutingModule { }
