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
import { ContactComponent } from "app/contact/contact.component";
import { AdminArticlesComponent } from "app/admin-articles/admin-articles.component";
import { AdminNewsComponent } from "app/admin-news/admin-news.component";
import { ScheduleComponent } from "app/schedule/schedule.component";
import { AdminSchedulesComponent } from "app/admin-schedules/admin-schedules.component";
import { ScheduleResolver } from "app/services/schedule-resolver.service";
import { AdminScheduleComponent } from "app/admin-schedule/admin-schedule.component";
import { ScheduleNewResolver } from "app/services/schedule-new-resolver.service";
import { AdminEventComponent } from "app/admin-event/admin-event.component";
import { EventResolver } from "app/services/event-resolver.service";
import { EventNewResolver } from "app/services/event-new-resolver.service";
import { NewsNewResolver } from "app/services/news-new-resolver.service";
import { NewsResolver } from "app/services/news-resolver.service";
import { AdminSingleNewsComponent } from "app/admin-single-news/admin-single-news.component";
import { NewsSingleComponent } from "app/news-single/news-single.component";
import { ArticlesComponent } from "app/articles/articles.component";
import { TermsComponent } from "app/terms/terms.component";
import { ForgotPasswordComponent } from "app/forgot-password/forgot-password.component";
import { SponsorsComponent } from "app/sponsors/sponsors.component";
import { AdminEnrolmentComponent } from "app/admin-enrolment/admin-enrolment.component";
import { UserResolver } from "app/services/user-resolver.service";
import { EnrolmentCreatedComponent } from "app/enrolment-created/enrolment-created.component";
import { AdminMailboxComponent } from "app/admin-mailbox/admin-mailbox.component";
import { LetterOfIntentComponent } from "app/letter-of-intent/letter-of-intent.component";
import { WelcomePageComponent } from "app/welcome-page/welcome-page.component";
import { LinksComponent } from "app/links/links.component";
import { PatronageComponent } from "app/patronage/patronage.component";
import { PaymentInfoComponent } from "app/payment-info/payment-info.component";
import { WorkshopsComponent } from "app/workshops/workshops.component";

export const router: Routes = [
    { path: '', component: WelcomePageComponent },
    { path: 'enrolments', component: EnrolmentsComponent },
    { path: 'application-form', component: ApplicationFormComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login-register', component: LoginRegisterComponent },
    { path: 'map', component: MapComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'welcome/terms', component: TermsComponent },
    { path: 'login-register/terms', component: TermsComponent },
    { path: 'news', component: NewsComponent },
    { path: 'welcome', component: WelcomePageComponent },
    {
        path: 'admin', component: AdminComponent, canActivate: [
            CanActivateAdminGuard
        ],
        //dodac guard
        children: [
            {
                path: '',
                component: EnrolmentsComponent,
                outlet: 'adminRouting'
            },
            {
                path: 'admin-articles',
                component: AdminArticlesComponent,
                outlet: 'adminRouting'
            },
            {
                path: 'admin-mailbox',
                component: AdminMailboxComponent,
                outlet: 'adminRouting'
            },
            {
                path: 'admin-news',
                component: AdminNewsComponent,
                outlet: 'adminRouting'
            },
            {
                path: 'admin-schedules',
                component: AdminSchedulesComponent,
                outlet: 'adminRouting'
            },
            {
                path: 'enrolments',
                component: EnrolmentsComponent,
                outlet: 'adminRouting'
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
                path: 'admin-schedule/:id',
                component: AdminScheduleComponent,
                resolve: {
                    schedule: ScheduleResolver
                }, canActivate: [
                    CanActivateAdminGuard
                ],
            },
            {
                path: 'admin-schedule-new',
                component: AdminScheduleComponent,
                resolve: {
                    schedule: ScheduleNewResolver
                }, canActivate: [
                    CanActivateAdminGuard
                ],
                outlet: 'adminRouting'
            },
        ]
    },
    {
        path: 'article/:id',
        component: ArticleComponent,
        resolve: {
            article: ArticleResolver
        }, 
    },
    {
        path: 'admin-user/:id',
        component: AdminEnrolmentComponent,
        resolve: {
            user: UserResolver
        }, canActivate: [
            CanActivateAdminGuard
        ],
    },
    {
        path: 'news/:id',
        component: NewsSingleComponent,
        resolve: {
            news: NewsResolver
        }, 
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
        path: 'admin-single-news/:id',
        component: AdminSingleNewsComponent,
        resolve: {
            news: NewsResolver
        }, canActivate: [
            CanActivateAdminGuard
        ],
    },
    {
        path: 'admin-schedule/:id',
        component: AdminScheduleComponent,
        resolve: {
            schedule: ScheduleResolver
        }, canActivate: [
            CanActivateAdminGuard
        ],
    },
    {
        path: 'admin-event/:id',
        component: AdminEventComponent,
        resolve: {
            event: EventResolver
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
        path: 'admin-schedule-new',
        component: AdminScheduleComponent,
        resolve: {
            schedule: ScheduleNewResolver
        }, canActivate: [
            CanActivateAdminGuard
        ],
    },
    {
        path: 'admin-event-new',
        component: AdminEventComponent,
        resolve: {
            event: EventNewResolver
        }, canActivate: [
            CanActivateAdminGuard
        ],
    },
    {
        path: 'admin-news-new',
        component: AdminSingleNewsComponent,
        resolve: {
            news: NewsNewResolver
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
    { path: 'articles', component: ArticlesComponent },
    { path: 'schedules', component: ScheduleComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'links', component: LinksComponent },    
    { path: 'login-register/forgot-password', component: ForgotPasswordComponent },
    { path: 'welcome/forgot-password', component: ForgotPasswordComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'sponsors', component: SponsorsComponent },
    { path: 'login-register/enrolment-created', component: EnrolmentCreatedComponent },
    { path: 'enrolment-created', component: EnrolmentCreatedComponent },
    { path: 'letter-of-intent', component: LetterOfIntentComponent },
    { path: 'workshops', component: WorkshopsComponent },    
    { path: 'patronage', component: PatronageComponent },
    { path: 'paymentInfo', component: PaymentInfoComponent }
    
    
];

export const routes: ModuleWithProviders = RouterModule.forRoot( router );