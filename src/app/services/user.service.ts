import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {

    private usersUrl = 'http://localhost:3000/users';

    constructor( private http: Http ) { }

    addUser( body: User ): Observable<User[]> {

        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post( this.usersUrl, JSON.stringify( body ), options )
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
    }

    getUsers(): Observable<User[]> {

        // ...using get request
        return this.http.get( this.usersUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

    }

}