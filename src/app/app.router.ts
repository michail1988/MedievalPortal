import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { EnrolmentsComponent } from './enrolments/enrolments.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { LoginComponent } from './login/login.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { AdminComponent } from "app/admin/admin.component";
import { CanActivateViaAuthGuard } from "app/services/can-activate-via-auth-guard";
import { MapComponent } from "app/map/map.component";


export const router: Routes = [
    { path: '', redirectTo: 'application-form', pathMatch: 'full' },
    { path: 'about', component: AboutComponent },
    { path: 'enrolments', component: EnrolmentsComponent },
    { path: 'application-form', component: ApplicationFormComponent },
    { path: 'login', component: LoginComponent },
    { path: 'editor', component: TextEditorComponent },
    { path: 'map', component: MapComponent },
    {
        path: 'admin', component: AdminComponent, canActivate: [
            CanActivateViaAuthGuard
        ],
    }


];

export const routes: ModuleWithProviders = RouterModule.forRoot( router );