import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
    declarations: [
        NavbarComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        BrowserAnimationsModule,
        HttpClientModule,
    ],
    exports: [
        //Shared  Modules
        CommonModule,
        BrowserAnimationsModule,
        HttpClientModule,

        //Shared Components
        NavbarComponent,
        FooterComponent,
    ]
})
export class CoreModule { }
