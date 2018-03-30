import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Article } from '../models/article';
import { ArticleHistory } from "app/models/article-history";
import { Observable } from 'rxjs/Rx';

//Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Config } from "app/utils/config";


@Injectable()
export class ArticleService {

    constructor( private http: Http ) { }

    private articlesUrl = Config.serverAddress + '/articles';
    private articleUrl = Config.serverAddress + '/article';
    private deletedArticlesUrl = Config.serverAddress + '/deletedArticles';
    private deleteArticleUrl = Config.serverAddress + '/deleteArticle';
    private activateArticleUrl = Config.serverAddress + '/activateArticle';
    
    
    
    private articleHistoryUrl = Config.serverAddress + '/articleHistory';

    getArticles(): Observable<Article[]> {

        // ...using get request
        return this.http.get( this.articlesUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }
    
    getDeletedArticles(): Observable<Article[]> {
        return this.http.get( this.deletedArticlesUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    //TODO serwer i testy
    getArticle( id: string ): Observable<any> {

        let params: URLSearchParams = new URLSearchParams();
        params.set( 'id', id );

        var options = new RequestOptions( { headers: new Headers( { 'Content-Type': 'application/json' } ) } );
        options.search = params;

        // ...using get request
        return this.http.get( this.articleUrl, options )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => res.json() )
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }
    
    get(id): Observable<Article> {
        return this.getArticle(id)
               .map(data => data.article);
    }
    
    getArticleHistory( id: string ): Observable<ArticleHistory[]> {

        let params: URLSearchParams = new URLSearchParams();
        params.set( 'id', id );

        var options = new RequestOptions( { headers: new Headers( { 'Content-Type': 'application/json' } ) } );
        options.search = params;

        // ...using get request
        return this.http.get( this.articleHistoryUrl, options )
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
    
    updateArticle( body: Article ): Observable<Article[]> {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.put( this.articlesUrl, JSON.stringify( body ), options )
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
    }

    deleteArticle( body: Article ): Observable<Article[]> {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post( this.deleteArticleUrl, JSON.stringify( body ), options )
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
    }

    activateArticle( body: Article ): Observable<Article[]> {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post( this.activateArticleUrl, JSON.stringify( body ), options )
            .map(( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
    }
    
}
