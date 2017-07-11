import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Article } from '../models/article';
import { Observable } from 'rxjs/Rx';

//Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ArticleService {

    constructor( private http: Http ) { }

    private articlesUrl = 'http://localhost:3000/articles';

    getArticles(): Observable<Article[]> {

        // ...using get request
        return this.http.get( this.articlesUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    addArticle( body: Article ): Observable<Article[]> {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post( this.articlesUrl, JSON.stringify( body ), options )
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
    }

    updateArticle( body: Object ): Observable<Article[]> {
        let bodyString = JSON.stringify( body ); // Stringify payload
        let headers = new Headers( { 'Content-Type': 'application/json' } ); // ... Set content type to JSON
        let options = new RequestOptions( { headers: headers } ); // Create a request option

        return this.http.put( `${this.articlesUrl}/${body['id']}`, body, options ) // ...using put request
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) ); //...errors if any
    }

    // Delete a enrolment
    removeArticle( id: string ): Observable<Article[]> {

        return this.http.delete( `${this.articlesUrl}/${id}` ) // ...using put request
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) ); //...errors if any
    }

}
