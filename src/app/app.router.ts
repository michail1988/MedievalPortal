import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EnrolmentsComponent } from './enrolments/enrolments.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { LoginComponent } from './login/login.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { AdminComponent } from "app/admin/admin.component";
import { CanActivateViaAuthGuard } from "app/services/can-activate-via-auth-guard";
import { MapComponent } from "app/map/map.component";
import { NewsComponent } from "app/news/news.component";
import { ArticleComponent } from "app/article/article.component";

import {ArticleResolver} from './services/article-resolver.service';

export const router: Routes = [
    { path: '', redirectTo: 'application-form', pathMatch: 'full' },
    { path: 'enrolments', component: EnrolmentsComponent },
    { path: 'application-form', component: ApplicationFormComponent },
    { path: 'login', component: LoginComponent },
    { path: 'map', component: MapComponent },
    { path: 'news', component: NewsComponent },
    {
        path: 'admin', component: AdminComponent, canActivate: [
            CanActivateViaAuthGuard
        ],
    },
    {
        path: 'article/:id',
        component: ArticleComponent,
        resolve: {
            article: ArticleResolver
        }
    }


];

export const routes: ModuleWithProviders = RouterModule.forRoot( router );