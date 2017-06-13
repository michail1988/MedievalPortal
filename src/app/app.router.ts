import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ApplicationFormComponent } from './application-form/application-form.component';

export const router: Routes = [
    { path: '', redirectTo: 'application-form', pathMatch: 'full' },
    { path: 'about', component: AboutComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'application-form', component: ApplicationFormComponent }
    
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);