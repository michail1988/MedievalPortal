import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Comment } from '../models/comment';
import { Observable } from 'rxjs/Rx';

//Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Config } from "app/utils/config";

@Injectable()
export class CommentNewsService {

    constructor( private http: Http ) { }

    private allCommentsUrl = Config.serverAddress + '/allNewsComments';
    private confirmedCommentsUrl = Config.serverAddress + '/confirmedNewsComments';

    getAllComments( id: string ): Observable<Comment[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set( 'id', id );

        var options = new RequestOptions( { headers: new Headers( { 'Content-Type': 'application/json' } ) } );
        options.search = params;

        return this.http.get( this.allCommentsUrl, options )
            .map(( res: Response ) => res.json() )
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    getConfirmedComments( id: string ): Observable<Comment[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set( 'id', id );

        var options = new RequestOptions( { headers: new Headers( { 'Content-Type': 'application/json' } ) } );
        options.search = params;

        return this.http.get( this.confirmedCommentsUrl, options )
            .map(( res: Response ) => res.json() )
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    addParentCommentConfirmedUser( body: Comment ): Observable<Comment[]> {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post( this.confirmedCommentsUrl, JSON.stringify( body ), options )
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
    }
    
    addParentCommentAdminUser( body: Comment ): Observable<Comment[]> {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post( this.allCommentsUrl, JSON.stringify( body ), options )
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
    }
}
