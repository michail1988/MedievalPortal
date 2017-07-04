import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from "@angular/router";

@Injectable()
export class AuthenticationService {
    token: string;

    constructor( private http: Http, public router: Router ) {
        this.token = localStorage.getItem( 'token' );
    }

    private loginUrl = 'http://localhost:3000/login';

    login( username: String, password: String ) {
        let body = JSON.stringify( { username, password } );

        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );

        return this.http.post( this.loginUrl, body, options )
            .subscribe(
            response => {
                //TODO Michal response.json().id_token
                if ( response.text() === 'OK' ) {
                    localStorage.setItem( 'token', 'Witamy! ' + response.text() );
                    console.log( 'Uwierzytelniono' );
                    this.router.navigate( ['admin'] );
                } else {
                    console.log( 'Zly uzytkownik nie przejdzie!' );
                }

            },
            error => {
                alert( error.text() );
                console.log( 'Blad logowania' );
                console.log( error.text() );
            }
            );
    }

    //TODO Michal get jest potrzebny?
    logout() {
        /*
         * If we had a login api, we would have done something like this

        return this.http.get(this.config.serverUrl + '/auth/logout', {
          headers: new Headers({
            'x-security-token': this.token
          })
        })
        .map((res : any) => {
          this.token = undefined;
          localStorage.removeItem('token');
        });
         */

        this.token = undefined;
        localStorage.removeItem( 'token' );

        return Observable.of( true );
    }

}
