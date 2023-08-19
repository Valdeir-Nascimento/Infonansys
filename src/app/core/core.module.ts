import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        NavbarComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule
    ],
    exports: [
        //Shared Modules
        NavbarComponent,
        FooterComponent,
        BrowserModule,
    ]
})
export class CoreModule { }
