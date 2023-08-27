import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    declarations: [
        CategoriaFormComponent,
        CategoriaListComponent
    ],
    imports: [
        SharedModule,
        CategoriaRoutingModule,
        ReactiveFormsModule,
    ]
})
export class CategoriasModule { }
