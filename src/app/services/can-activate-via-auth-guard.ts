import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { isLoggedin } from '../services/is-loggedin';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

    constructor() { }

    canActivate() {
        return !!localStorage.getItem( 'token' );
    }

}