import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams  } from '@angular/http';
import { University } from '../models/university';
import { Observable } from 'rxjs/Rx';

//Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UniversityService {

    constructor( private http: Http ) { }

    private universitiesUrl = 'http://localhost:3000/universities';

    getUniversities( university: string ): Observable<University[]> {

        let params: URLSearchParams = new URLSearchParams();
        params.set( 'university', university );
        
        var options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});
        options.search = params;

        // ...using get request
        return this.http.get( this.universitiesUrl, options)
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

    }

}
