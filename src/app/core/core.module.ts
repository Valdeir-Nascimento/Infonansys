import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';

@NgModule({
    declarations: [
        NavbarComponent,
        FooterComponent,
        BreadCrumbComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        BrowserAnimationsModule,
        HttpClientModule,
    ],
    exports: [
        //Shared Modules
        NavbarComponent,
        FooterComponent,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule
    ]
})
export class CoreModule { }
