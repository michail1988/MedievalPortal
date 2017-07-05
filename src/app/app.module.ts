import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { CarouselComponent } from './carousel/carousel.component';
import { MenuComponent } from './menu/menu.component';
import { EnrolmentsComponent } from './enrolments/enrolments.component';

import { EnrolmentService } from './services/enrolment.service';
import { AuthenticationService } from './services/authentication.service';

import { routes } from './app.router';
import { LoginComponent } from './login/login.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { AdminComponent } from './admin/admin.component';
import { CanActivateViaAuthGuard } from "./services/can-activate-via-auth-guard";
import { MapComponent } from './map/map.component';
import { NewsComponent } from './news/news.component';



@NgModule( {
    declarations: [
        AppComponent,
        SiteHeaderComponent,
        ApplicationFormComponent,
        CarouselComponent,
        MenuComponent,
        EnrolmentsComponent,
        LoginComponent,
        TextEditorComponent,
        AdminComponent,
        MapComponent,
        NewsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routes,
        AgmCoreModule.forRoot( {
            apiKey: 'AIzaSyCgJJ5A9fLh9CcSVt6jcC1wSCtXfqow9G0'
        } )
    ],
    providers: [EnrolmentService, AuthenticationService, CanActivateViaAuthGuard],
    bootstrap: [AppComponent]
} )
export class AppModule { }
