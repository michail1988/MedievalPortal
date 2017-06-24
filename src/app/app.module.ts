import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { CarouselComponent } from './carousel/carousel.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';

import { routes } from './app.router';

@NgModule( {
    declarations: [
        AppComponent,
        SiteHeaderComponent,
        ApplicationFormComponent,
        CarouselComponent,
        MenuComponent,
        AboutComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routes
    ],
    providers: [],
    bootstrap: [AppComponent]
} )
export class AppModule { }
