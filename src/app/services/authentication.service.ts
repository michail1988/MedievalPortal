import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { User } from 'app/models/user';

@Injectable()
export class AuthenticationService {
    token: string;

    constructor( private http: Http, public router: Router ) {
        this.token = localStorage.getItem( 'token' );
    }

    private loginUrl = 'http://localhost:3000/login';

    user: User;
    
    users: User[];
    login( username: string, password: string ) {

        console.log('Proba zalogowania.')
//        var users = this.getUser( username, password )
//        .subscribe(
//                enrolments => this.users = enrolments, //Bind to view
//                err => {
//                    // Log errors if any
//                    console.log( err );
//                } );
//
//        console.log('Otrzymano=' + users)
//        console.log('Otrzymano[0]=' + users[0])
//        console.log('stringify=' + JSON.stringify(users))
//        if ( users[0] ) {
//            this.user = users[0];
//
//            localStorage.setItem( 'token', 'Zalogowany= ' + this.user.name );
//                      console.log( 'Uwierzytelniono= ' +  this.user.surname);
//            this.router.navigate( ['admin'] );
//
//        }

        //        let body = JSON.stringify( { username, password } );
        //
        //        let headers = new Headers( { 'Content-Type': 'application/json' } );
        //        let options = new RequestOptions( { headers: headers } );
        //
        //        return this.http.post( this.loginUrl, body, options )
        //        .map(( res: Response ) => res.json() )
        //            //...errors if any
        //            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) )
        //        
        //            .subscribe(
        //            response => {
        //                //TODO Michal response.json().id_token
        //                if ( response.user) {
        //                    
        //                    localStorage.setItem( 'token', 'Witamy! ' + response.user );
        //                    console.log( 'Uwierzytelniono' );
        //                    this.router.navigate( ['admin'] );
        //                } else {
        //                    console.log( 'Zly uzytkownik nie przejdzie!' );
        //                }
        //
        //            },
        //            error => {
        //                console.log( 'Blad logowania' );
        //                console.log( error.text() );
        //            }
        //            );
    }

    getUser( username: string, password: string ): Observable<User> {

        let body = JSON.stringify( { username, password } );

        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );

        return this.http.post( this.loginUrl, { username, password }, options )
            .map(( res: Response ) => {

                let user = res.json();
                
                console.log("Otrzymano odpowiedz=", user)
                
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                
                return user;
                } ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
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
