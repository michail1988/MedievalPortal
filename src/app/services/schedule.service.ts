import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Schedule } from '../models/schedule';
import { Observable } from 'rxjs/Rx';

//Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Config } from "app/utils/config";


@Injectable()
export class ScheduleService {

    constructor( private http: Http ) { }

    private schedulesUrl = Config.serverAddress + '/schedules';
    private scheduleUrl = Config.serverAddress + '/schedule';
    private deleteScheduleUrl = Config.serverAddress + '/deleteSchedule';

    getSchedules(): Observable<Schedule[]> {

        return this.http.get( this.schedulesUrl )
            .map(( res: Response ) => res.json() )
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    getSchedule( id: string ): Observable<any> {

        let params: URLSearchParams = new URLSearchParams();
        params.set( 'id', id );

        var options = new RequestOptions( { headers: new Headers( { 'Content-Type': 'application/json' } ) } );
        options.search = params;

        // ...using get request
        return this.http.get( this.scheduleUrl, options )
            .map(( res: Response ) => res.json() )
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    get( id ): Observable<Schedule> {
        return this.getSchedule( id )
            .map( data => data.schedule );
    }

    addSchedule( body: Schedule ): Observable<Schedule[]> {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post( this.scheduleUrl, JSON.stringify( body ), options )
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
    }

    updateSchedule( body: Schedule ): Observable<Schedule[]> {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.put( this.scheduleUrl, JSON.stringify( body ), options )
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
    }

    deleteSchedule( body: Schedule ): Observable<Schedule[]> {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post( this.deleteScheduleUrl, JSON.stringify( body ), options )
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
    }
}
