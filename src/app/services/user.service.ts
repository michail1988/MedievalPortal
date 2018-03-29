import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Rx';
import { UserHistory } from "app/models/user-history";

@Injectable()
export class UserService {

    private usersUrl = 'http://localhost:3000/users';
    private userUrl = 'http://localhost:3000/user';
    
    private acceptedUsersUrl = 'http://localhost:3000/acceptedUsers';
    private pendingUsersUrl = 'http://localhost:3000/pendingUsers';
    private rejectedUsersUrl = 'http://localhost:3000/rejectedUsers';
    
    private speakersUrl = 'http://localhost:3000/speakers';
    

    private acceptUserUrl = 'http://localhost:3000/acceptUser';
    private rejectUserUrl = 'http://localhost:3000/rejectUser';
    
    
    
    //TODO
    private userHistoryUrl = 'http://localhost:3000/articleHistory';
    
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
    
    getPendingUsers(): Observable<User[]> {

        // ...using get request
        return this.http.get( this.pendingUsersUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

    }
    
    getRejectedUsers(): Observable<User[]> {

        // ...using get request
        return this.http.get( this.rejectedUsersUrl )
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
    
    updateUser( body: User ): Observable<User[]> {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.put( this.usersUrl, JSON.stringify( body ), options )
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
    }
    
    get(id: string): Observable<User> {
        return this.getUser(id)
               .map(data => data);
    }
    
    acceptUser( body: User ): any {

        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post(this.acceptUserUrl, JSON.stringify(body), options);
    }
    
    rejectUser( body: User ): any {

        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post(this.rejectUserUrl, JSON.stringify(body), options);
    }
    
    getUserHistory( id: string ): Observable<UserHistory[]> {

        let params: URLSearchParams = new URLSearchParams();
        params.set( 'id', id );

        var options = new RequestOptions( { headers: new Headers( { 'Content-Type': 'application/json' } ) } );
        options.search = params;

        // ...using get request
        return this.http.get( this.userHistoryUrl, options )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
        
    }
}
