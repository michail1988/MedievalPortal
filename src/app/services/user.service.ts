import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Rx';
import { UserHistory } from "app/models/user-history";
import { Config } from "app/utils/config";

@Injectable()
export class UserService {

    private usersUrl = Config.serverAddress + '/users';
    private userUrl = Config.serverAddress + '/user';
    
    private acceptedUsersUrl = Config.serverAddress + '/acceptedUsers';
    private pendingUsersUrl = Config.serverAddress + '/pendingUsers';
    private rejectedUsersUrl = Config.serverAddress + '/rejectedUsers';
    
    private speakersUrl = Config.serverAddress + '/speakers';
    

    private acceptUserUrl = Config.serverAddress + '/acceptUser';
    private rejectUserUrl = Config.serverAddress + '/rejectUser';
    
    private acceptPaymentUrl = Config.serverAddress + '/acceptPayment';
    private rejectPaymentUrl = Config.serverAddress + '/rejectPayment';
    private acceptedPaymentUrl = Config.serverAddress + '/acceptedPayment';
    private pendingPaymentUrl = Config.serverAddress + '/pendingPayment';
    
    private userPasswordUrl = Config.serverAddress + '/userPassword';
    
    //TODO
    private userHistoryUrl = Config.serverAddress + '/userHistory';
    
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
    
    updatePassword ( body: User ): Observable<User[]> {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.put( this.userPasswordUrl, JSON.stringify( body ), options )
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
    
    acceptPayment( body: User ): any {

        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post(this.acceptPaymentUrl, JSON.stringify(body), options);
    }
    
    rejectPayment( body: User ): any {

        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post(this.rejectPaymentUrl, JSON.stringify(body), options);
    }
    
    getAcceptedPayment(): Observable<User[]> {

        // ...using get request
        return this.http.get( this.acceptedPaymentUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

    }
    
    getPendingPayment(): Observable<User[]> {

        // ...using get request
        return this.http.get( this.pendingPaymentUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

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
