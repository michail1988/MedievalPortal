import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ContactMessage } from "app/models/contact-message";
import { Observable } from 'rxjs/Rx';

//Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ForgotPasswordMessage } from "app/models/forgot-password-message";



@Injectable()
export class ContactService {

    constructor( private http: Http ) { }
    // private instance variable to hold base url
    private contactUrl = 'http://localhost:3000/contactMessage';
    private contactsUrl = 'http://localhost:3000/adminMessages';
    
    private forgotPasswordUrl = 'http://localhost:3000/forgotPassword';

    addMessage( body: ContactMessage ): any {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post( this.contactUrl, JSON.stringify( body ), options )
            .map(( res: Response ) => {
                
                return true;
            })
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
    }
    
    sendAdminMessages( body: ContactMessage ): any {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post( this.contactsUrl, JSON.stringify( body ), options )
            .map(( res: Response ) => {
                
                return true;
            })
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
    }
    
    sendPassword( body: ForgotPasswordMessage ): any {
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let options = new RequestOptions( { headers: headers } );
        return this.http.post( this.forgotPasswordUrl, JSON.stringify( body ), options )
            .map(( res: Response ) => {
                
                return true;
            })
            .catch(( error: any ) => Observable.throw( error || 'Server error' ) ); //...errors if any
    }

}
