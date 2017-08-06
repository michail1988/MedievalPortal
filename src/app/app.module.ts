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

import { EnrolmentService } from './services/enrolment.service';
import { ArticleService } from './services/article.service';
import { AuthenticationService } from './services/authentication.service';
import { UniversityService } from './services/university.service';
import { ArticleResolver } from './services/article-resolver.service';

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
import { SiteHeaderComponent } from './site-header/site-header.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { CarouselComponent } from './carousel/carousel.component';
import { MenuComponent } from './menu/menu.component';
import { EnrolmentsComponent } from './enrolments/enrolments.component';
import { UserService } from "app/services/user.service";
import { SlideComponent } from './slide/slide.component';
import { Art1Component } from './art1/art1.component';
import { Art2Component } from './art2/art2.component';
import { Art3Component } from './art3/art3.component';


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
        Art1Component,
        Art2Component,
        Art3Component
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
        CarouselModule
    ],
    providers: [EnrolmentService, ArticleService, AuthenticationService, UniversityService, UserService, CanActivateAdminGuard, CanActivateUserGuard, TRANSLATION_PROVIDERS, TranslateService, ArticleResolver, ArticleNewResolver, ConfirmationService],
    bootstrap: [AppComponent]
} )
export class AppModule { }
