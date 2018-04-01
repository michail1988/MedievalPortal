import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AgmCoreModule } from '@agm/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

//PrimeNG
import { AutoCompleteModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { ArticleComponent } from './article/article.component';
import { InputMaskModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { BreadcrumbModule } from 'primeng/primeng';
import { AccordionModule } from 'primeng/primeng';
import { ArticleNewResolver } from "app/services/article-new-resolver.service";
import { LoginRegisterComponent } from './login-register/login-register.component';
import { SelectButtonModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { CarouselModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';

import { EnrolmentService } from './services/enrolment.service';
import { ArticleService } from './services/article.service';
import { AuthenticationService } from './services/authentication.service';
import { UniversityService } from './services/university.service';
import { ArticleResolver } from './services/article-resolver.service';
import { ContactService } from "app/services/contact.service";
import { CommentService } from './services/comment.service';
import { ImageService } from './services/image.service';
import { NewsService } from './services/news.service';

//internationalization
import { TranslateService } from "app/translations/translate.service";
import { TRANSLATION_PROVIDERS } from "app/translations/translations";
import { TranslatePipe } from "app/translations/translate.pipe";
import { LanguagesComponent } from './languages/languages.component';

//guards
import { CanActivateAdminGuard } from "app/services/can-activate-admin-guard";
import { CanActivateUserGuard } from "app/services/can-activate-user-guard";

import { routes } from './app.router';
import { LoginComponent } from './login/login.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { AdminComponent } from './admin/admin.component';
import { MapComponent } from './map/map.component';
import { NewsComponent } from './news/news.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleBoxComponent } from './article-box/article-box.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AdminArticlesComponent } from './admin-articles/admin-articles.component';
import { PrintComponent } from './print/print.component';
import { AdminArticleComponent } from './admin-article/admin-article.component';
import { AdminArticleHistoryComponent } from './admin-article-history/admin-article-history.component';
import { UserLoggedComponent } from './user-logged/user-logged.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AppComponent } from './app.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { CarouselComponent } from './carousel/carousel.component';
import { MenuComponent } from './menu/menu.component';
import { EnrolmentsComponent } from './enrolments/enrolments.component';
import { UserService } from "app/services/user.service";
import { SlideComponent } from './slide/slide.component';
import { ContactComponent } from './contact/contact.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { CommentBoxComponent } from './comment-box/comment-box.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { AdminSchedulesComponent } from './admin-schedules/admin-schedules.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AdminScheduleComponent } from './admin-schedule/admin-schedule.component';
import { AdminEventComponent } from './admin-event/admin-event.component';
import { ScheduleResolver } from "app/services/schedule-resolver.service";
import { ScheduleNewResolver } from "app/services/schedule-new-resolver.service";
import { NewsResolver } from "app/services/news-resolver.service";
import { NewsNewResolver } from "app/services/news-new-resolver.service";
import { ScheduleService } from "app/services/schedule.service";
import { EventService } from "app/services/event.service";
import { EventResolver } from "app/services/event-resolver.service";
import { EventNewResolver } from "app/services/event-new-resolver.service";
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { AdminSingleNewsComponent } from './admin-single-news/admin-single-news.component';
import { NewsBoxComponent } from './news-box/news-box.component';
import { NewsSingleComponent } from './news-single/news-single.component';
import { CommentNewsService } from "app/services/comment-news.service";
import { AdminTableButtonComponent } from './admin-table-button/admin-table-button.component';
import { TermsComponent } from './terms/terms.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { AdminEnrolmentComponent } from './admin-enrolment/admin-enrolment.component';
import { EnrolmentCreatedComponent } from './enrolment-created/enrolment-created.component';
import { UserResolver } from "app/services/user-resolver.service";
import { AdminMailboxComponent } from './admin-mailbox/admin-mailbox.component';
import { LetterOfIntentComponent } from './letter-of-intent/letter-of-intent.component';
import { ActionAdminEnrolmentComponent } from './action-admin-enrolment/action-admin-enrolment.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { Footer2Component } from './footer2/footer2.component';
import { RegistrationInfoComponent } from './registration-info/registration-info.component';
import { OrganizersComponent } from './organizers/organizers.component';
import { LogoComponent } from './logo/logo.component';



@NgModule( {
    declarations: [
        AppComponent,
        ApplicationFormComponent,
        CarouselComponent,
        MenuComponent,
        EnrolmentsComponent,
        LoginComponent,
        TextEditorComponent,
        AdminComponent,
        MapComponent,
        NewsComponent,
        ArticlesComponent,
        ArticleBoxComponent,
        FooterComponent,
        HeaderComponent,
        TranslatePipe,
        LanguagesComponent,
        AdminArticlesComponent,
        ArticleComponent,
        PrintComponent,
        AdminArticleComponent,
        AdminArticleHistoryComponent,
        LoginRegisterComponent,
        UserLoggedComponent,
        UserProfileComponent,
        SlideComponent,
        ContactComponent,
        AdminMenuComponent,
        CommentBoxComponent,
        SchedulesComponent,
        AdminSchedulesComponent,
        ScheduleComponent,
        AdminScheduleComponent,
        AdminEventComponent,
        AdminNewsComponent,
        AdminSingleNewsComponent,
        NewsBoxComponent,
        NewsSingleComponent,
        AdminTableButtonComponent,
        TermsComponent,
        ForgotPasswordComponent,
        SponsorsComponent,
        AdminEnrolmentComponent,
        EnrolmentCreatedComponent,
        AdminMailboxComponent,
        LetterOfIntentComponent,
        ActionAdminEnrolmentComponent,
        WelcomePageComponent,
        Footer2Component,
        RegistrationInfoComponent,
        OrganizersComponent,
        LogoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routes,
        AgmCoreModule.forRoot( {
            apiKey: 'AIzaSyCgJJ5A9fLh9CcSVt6jcC1wSCtXfqow9G0'
        } ),
        AutoCompleteModule,
        EditorModule,
        ButtonModule,
        InputMaskModule,
        RadioButtonModule,
        InputTextModule,
        TabViewModule,
        Ng2SmartTableModule,
        ConfirmDialogModule,
        BreadcrumbModule,
        AccordionModule,
        SelectButtonModule,
        FileUploadModule,
        GrowlModule,
        CarouselModule,
        CalendarModule,
        MultiSelectModule,
        CheckboxModule
    ],
    providers: [EnrolmentService, ArticleService, AuthenticationService, UniversityService, UserService,
        CanActivateAdminGuard, CanActivateUserGuard, TRANSLATION_PROVIDERS, TranslateService,
        ArticleResolver, ArticleNewResolver, ScheduleResolver, ScheduleNewResolver, EventResolver,
        EventNewResolver,
        ConfirmationService, ImageService, NewsService,
        NewsResolver, NewsNewResolver,
        ContactService, CommentService, CommentNewsService, ScheduleService, EventService, UserResolver],
    entryComponents: [ActionAdminEnrolmentComponent],
    bootstrap: [AppComponent],
} )
export class AppModule { }
