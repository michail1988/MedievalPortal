import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Enrolment } from '../models/enrolment';
import { Observable } from 'rxjs/Rx';

//Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EnrolmentService {

    // Resolve HTTP using the constructor
    constructor( private http: Http ) { }
    // private instance variable to hold base url
    private enrolmentsUrl = 'http://localhost:3000/enrolments';

    getEnrolments(): Observable<Enrolment[]> {

        // ...using get request
        return this.http.get( this.enrolmentsUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

    }

    // Add a new enrolment
    addEnrolment( body: Object ): Observable<Enrolment[]> {
        let bodyString = JSON.stringify( body ); // Stringify payload
        let headers = new Headers( { 'Content-Type': 'application/json' } ); // ... Set content type to JSON
        let options = new RequestOptions( { headers: headers } ); // Create a request option

        return this.http.post( this.enrolmentsUrl, body, options ) // ...using post request
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) ); //...errors if any
    }

    // Update a enrolment
    updateEnrolment( body: Object ): Observable<Enrolment[]> {
        let bodyString = JSON.stringify( body ); // Stringify payload
        let headers = new Headers( { 'Content-Type': 'application/json' } ); // ... Set content type to JSON
        let options = new RequestOptions( { headers: headers } ); // Create a request option

        return this.http.put( `${this.enrolmentsUrl}/${body['id']}`, body, options ) // ...using put request
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) ); //...errors if any
    }

    // Delete a enrolment
    removeEnrolment( id: string ): Observable<Enrolment[]> {
        return this.http.delete( `${this.enrolmentsUrl}/${id}` ) // ...using put request
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) ); //...errors if any
    }

}
