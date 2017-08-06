import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EnrolmentsComponent } from './enrolments/enrolments.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { LoginComponent } from './login/login.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { AdminComponent } from "app/admin/admin.component";
import { MapComponent } from "app/map/map.component";
import { NewsComponent } from "app/news/news.component";
import { ArticleComponent } from "app/article/article.component";

import { ArticleResolver } from './services/article-resolver.service';
import { AdminArticleComponent } from "app/admin-article/admin-article.component";
import { ArticleNewResolver } from "app/services/article-new-resolver.service";
import { LoginRegisterComponent } from "app/login-register/login-register.component";
import { CanActivateAdminGuard } from "app/services/can-activate-admin-guard";
import { UserLoggedComponent } from "app/user-logged/user-logged.component";
import { CanActivateUserGuard } from "app/services/can-activate-user-guard";
import { UserProfileComponent } from "app/user-profile/user-profile.component";
import { Art1Component } from "app/art1/art1.component";
import { Art2Component } from "app/art2/art2.component";
import { Art3Component } from "app/art3/art3.component";

export const router: Routes = [
    { path: '', redirectTo: 'application-form', pathMatch: 'full' },
    { path: 'enrolments', component: EnrolmentsComponent },
    { path: 'application-form', component: ApplicationFormComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login-register', component: LoginRegisterComponent },
    { path: 'map', component: MapComponent },
    { path: 'news', component: NewsComponent },
    {
        path: 'admin', component: AdminComponent, canActivate: [
            CanActivateAdminGuard
        ],
    },
    {
        path: 'article/:id',
        component: ArticleComponent,
        resolve: {
            article: ArticleResolver
        }, canActivate: [
            CanActivateAdminGuard
        ],
    },
    {
        path: 'admin-article/:id',
        component: AdminArticleComponent,
        resolve: {
            article: ArticleResolver
        }, canActivate: [
            CanActivateAdminGuard
        ],
    },
    {
        path: 'admin-article-new',
        component: AdminArticleComponent,
        resolve: {
            article: ArticleNewResolver
        }, canActivate: [
            CanActivateAdminGuard
        ],
    },
    {
        path: 'user-profile',
        component: UserProfileComponent,
        resolve: {
            article: ArticleNewResolver
        }, canActivate: [
            CanActivateUserGuard
        ],
    },
    { path: 'art1', component: Art1Component },
    { path: 'art2', component: Art2Component },
    { path: 'art3', component: Art3Component }







];

export const routes: ModuleWithProviders = RouterModule.forRoot( router );