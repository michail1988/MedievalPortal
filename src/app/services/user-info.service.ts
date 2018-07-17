import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Rx';
import { UserInfo } from "app/models/user-info";
import { Config } from "app/utils/config";

@Injectable()
export class UserInfoService {

    private allUsersInfoUrl = Config.serverAddress + '/allUsersInfo';
    
    private acceptedUsersInfoUrl = Config.serverAddress + '/acceptedUsersInfoUrl';
    private pendingUsersInfoUrl = Config.serverAddress + '/pendingUsersInfoUrl';
    private rejectedUsersInfoUrl = Config.serverAddress + '/rejectedUsersInfoUrl';
    private speakersUsersInfoUrl = Config.serverAddress + '/speakersUsersInfoUrl';
    private paymentAcceptedUsersInfoUrl = Config.serverAddress + '/paymentAcceptedUsersInfoUrl';
    private paymentPendingUsersInfoUrl = Config.serverAddress + '/paymentPendingUsersInfoUrl';
    private workshopUsersInfoUrl = Config.serverAddress + '/workshopUsersInfoUrl';
    private invoiceUsersInfoUrl = Config.serverAddress + '/invoiceUsersInfoUrl';

    constructor( private http: Http ) { }

    getAllUsersInfo(): Observable<UserInfo> {

        // ...using get request
        return this.http.get( this.allUsersInfoUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => { 
                let userInfo = res.json();
                return userInfo;
            })
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

    }
    
    getAcceptedUsersInfo(): Observable<UserInfo> {

        // ...using get request
        return this.http.get( this.acceptedUsersInfoUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => { 
                let userInfo = res.json();
                return userInfo;
            })
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

    }
    
    getPendingUsersInfo(): Observable<UserInfo> {

        // ...using get request
        return this.http.get( this.pendingUsersInfoUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => { 
                let userInfo = res.json();
                return userInfo;
            })
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

    }
    
    getRejectedUsersInfo(): Observable<UserInfo> {

        // ...using get request
        return this.http.get( this.rejectedUsersInfoUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => { 
                let userInfo = res.json();
                return userInfo;
            })
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

    }
    
    getSpeakersUsersInfo(): Observable<UserInfo> {

        // ...using get request
        return this.http.get( this.speakersUsersInfoUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => { 
                let userInfo = res.json();
                return userInfo;
            })
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

    }
    
    getPaymentAcceptedUsersInfo(): Observable<UserInfo> {

        // ...using get request
        return this.http.get( this.paymentAcceptedUsersInfoUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => { 
                let userInfo = res.json();
                return userInfo;
            })
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

    }
    
    getPaymentPendingUsersInfo(): Observable<UserInfo> {

        // ...using get request
        return this.http.get( this.paymentPendingUsersInfoUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => { 
                let userInfo = res.json();
                return userInfo;
            })
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

    }
    
    getWorkshopUsersInfo(): Observable<UserInfo> {

        // ...using get request
        return this.http.get( this.workshopUsersInfoUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => { 
                let userInfo = res.json();
                return userInfo;
            })
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

    }
    
    getInvoiceUsersInfo(): Observable<UserInfo> {

        // ...using get request
        return this.http.get( this.invoiceUsersInfoUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => { 
                let userInfo = res.json();
                return userInfo;
            })
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

    }
    
    
    
    
}