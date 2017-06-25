import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { EnrolmentsComponent } from './enrolments/enrolments.component';
import { ApplicationFormComponent } from './application-form/application-form.component';

export const router: Routes = [
    { path: '', redirectTo: 'application-form', pathMatch: 'full' },
    { path: 'about', component: AboutComponent },
    { path: 'enrolments', component: EnrolmentsComponent },
    { path: 'application-form', component: ApplicationFormComponent }
    
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);