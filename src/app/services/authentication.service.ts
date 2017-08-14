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

    login( username: string, password: string ): Observable<User> {

        let body = JSON.stringify( { username, password } );

        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );

        return this.http.post( this.loginUrl, { username, password }, options )
            .map(( res: Response ) => {

                let user = res.json();
                
                console.log('Response=' + JSON.stringify(user))
                if (user) {
                    
                    // zaloguj uzytkownika
                    localStorage.setItem('userid', user.id)
                    localStorage.setItem('username', user.name)
                    
                    console.log('Dobrze')
                    
                    if (user.privileges === 'A') {
                        //zaloguj admina
                        localStorage.setItem('admintoken', JSON.stringify(user))
                        
                        console.log('Bardzo dobrze')
                    }
                    
                    
                } else {
                    console.log('Niedobrze')
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
        localStorage.removeItem( 'userid' );
        localStorage.removeItem( 'username' );
        localStorage.removeItem( 'admintoken' );

        return Observable.of( true );
    }

}
