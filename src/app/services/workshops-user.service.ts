import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

//Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Config } from "app/utils/config";
import { WorkshopUser } from "app/models/workshop-user";
import { User } from "app/models/user";

@Injectable()
export class WorkshopsUserService {

    private allWorkshops = Config.serverAddress + '/allWorkshops';

    private insertWorkshop = Config.serverAddress + '/insertWorkshop';
    private deleteWorkshops = Config.serverAddress + '/deleteWorkshops';
    private forUser = Config.serverAddress + '/forUser';
    private forWorkshop = Config.serverAddress + '/forWorkshop';

    constructor( private http: Http ) { }


    getWorkshops(): Observable<WorkshopUser[]> {

        // ...using get request
        return this.http.get( this.allWorkshops )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    getWorkshopsForUser( id: string ): Observable<WorkshopUser[]> {

        let params: URLSearchParams = new URLSearchParams();
        params.set( 'fk_user', id );

        var options = new RequestOptions( { headers: new Headers( { 'Content-Type': 'application/json' } ) } );
        options.search = params;

     // ...using get request
        return this.http.get( this.forUser, options )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    addWorkshopUser( body: WorkshopUser ): Observable<WorkshopUser[]> {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post( this.insertWorkshop, JSON.stringify( body ), options )
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
    }

    deleteWorkshopUser( body: WorkshopUser ): Observable<WorkshopUser[]> {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post( this.deleteWorkshops, JSON.stringify( body ), options )
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
    }
    
    getUsersForWorkshop( id: string ): Observable<User[]> {

        let params: URLSearchParams = new URLSearchParams();
        params.set( 'fk_workshop', id );

        var options = new RequestOptions( { headers: new Headers( { 'Content-Type': 'application/json' } ) } );
        options.search = params;

     // ...using get request
        return this.http.get( this.forWorkshop, options )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

}
