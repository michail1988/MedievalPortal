import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

//Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Config } from "app/utils/config";
import { Workshop } from "app/models/workshop";

@Injectable()
export class WorkshopService {
    
    constructor( private http: Http ) { }

    private workshopsUrl = Config.serverAddress + '/workshops';
    private workshopUrl = Config.serverAddress + '/workshop';
    private deletedWorkshopsUrl = Config.serverAddress + '/deletedWorkshops';
    private deleteWorkshopUrl = Config.serverAddress + '/deleteWorkshop';
    private activateWorkshopUrl = Config.serverAddress + '/activateWorkshop';
    
    

    
    getWorkshops(): Observable<Workshop[]> {

        // ...using get request
        return this.http.get( this.workshopsUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }
    
    getDeletedWorkshops(): Observable<Workshop[]> {
        return this.http.get( this.deletedWorkshopsUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    //TODO serwer i testy
    getWorkshop( id: string ): Observable<any> {

        let params: URLSearchParams = new URLSearchParams();
        params.set( 'id', id );

        var options = new RequestOptions( { headers: new Headers( { 'Content-Type': 'application/json' } ) } );
        options.search = params;

        // ...using get request
        return this.http.get( this.workshopUrl, options )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }
    
    get(id): Observable<Workshop> {
        return this.getWorkshop(id)
               .map(data => data.article);
    }
    
    addWorkshop( body: Workshop ): Observable<Workshop[]> {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post( this.workshopUrl, JSON.stringify( body ), options )
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
    }
    
    updateWorkshop( body: Workshop ): Observable<Workshop[]> {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.put( this.workshopUrl, JSON.stringify( body ), options )
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
    }

    deleteWorkshop( body: Workshop ): Observable<Workshop[]> {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post( this.deleteWorkshopUrl, JSON.stringify( body ), options )
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
    }
    
    activateWorkshop( body: Workshop ): Observable<Workshop[]> {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post( this.activateWorkshopUrl, JSON.stringify( body ), options )
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
    }
}
