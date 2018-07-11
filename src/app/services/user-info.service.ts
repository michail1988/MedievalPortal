import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { User } from '../models/user';
import { Observable } from 'rxjs/Rx';
import { UserInfo } from "app/models/user-info";
import { Config } from "app/utils/config";

@Injectable()
export class UserInfoService {

    private usersInfoUrl = Config.serverAddress + '/usersInfo';

    constructor( private http: Http ) { }

    getUsersInfo(): Observable<UserInfo> {

        // ...using get request
        return this.http.get( this.usersInfoUrl )
            // ...and calling .json() on the response to return data
            .map(( res: Response ) => { 
                let userInfo = res.json();
                return userInfo;
            })
            //...errors if any
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

    }
}