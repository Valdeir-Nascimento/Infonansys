import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        CategoriaFormComponent,
        CategoriaListComponent
    ],
    imports: [
        CommonModule,
        CategoriaRoutingModule,
        ReactiveFormsModule
    ]
})
export class CategoriasModule { }
