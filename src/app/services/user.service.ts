import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {

    private usersUrl = 'http://localhost:3000/users';
    private userUrl = 'http://localhost:3000/user';
    
    private acceptedUsersUrl = 'http://localhost:3000/acceptedUsers';
    private notAcceptedUsersUrl = 'http://localhost:3000/notAcceptedUsers';
    private speakersUrl = 'http://localhost:3000/speakers';

    constructor( private http: Http ) { }

    addUser( body: User ): any {

        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post(this.usersUrl, JSON.stringify(body), options);
    }

    getUsers(): Observable<User[]> {

        // ...using get request
        return this.http.get( this.usersUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

    }
    
    getAcceptedUsers(): Observable<User[]> {

        // ...using get request
        return this.http.get( this.acceptedUsersUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

    }
    
    getNotAcceptedUsers(): Observable<User[]> {

        // ...using get request
        return this.http.get( this.notAcceptedUsersUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

    }
    
    getSpeakers(): Observable<User[]> {

        // ...using get request
        return this.http.get( this.speakersUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

    }

    getLoggedUserId() {
        return localStorage.getItem( 'userid' );
    }

    getUser( id: string ): Observable<User> {

        let params: URLSearchParams = new URLSearchParams();
        params.set( 'id', id );

        var options = new RequestOptions( { headers: new Headers( { 'Content-Type': 'application/json' } ) } );
        options.search = params;

        // ...using get request
        return this.http.get( this.userUrl, options )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }
    
    get(id: string): Observable<User> {
        return this.getUser(id)
               .map(data => data);
    }
}
