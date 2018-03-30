import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { AuthenticationService } from '../services/authentication.service';
import { Config } from "app/utils/config";

//todo michal stworzyc login serwis
@Component( {
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
} )

//https://github.com/auth0-blog/angular2-authentication-sample/tree/master/src/login
export class LoginComponent implements OnInit {

    constructor( private authenticationService: AuthenticationService, public router: Router, public http: Http ) {
    }

    private loginUrl = Config.serverAddress + '/login';

    //todo michal service z emmiterem

    login( event, username, password ) {

        //co to jest?
        event.preventDefault();


        this.authenticationService.login( username, password );
    }

    signup( event ) {
        event.preventDefault();
        this.router.navigate( ['signup'] );
    }

    get diagnostic() {
        var item = localStorage.getItem( 'token' );

        return 'Zalogowany= ' + item;
    }

    logout() {
        this.authenticationService.logout();
    }


    ngOnInit() {
    }

}
