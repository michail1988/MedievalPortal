import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { isLoggedin } from '../services/is-loggedin';

//TODO user obiekt
@Injectable()
export class CanActivateUserGuard {
    
    constructor() { }

    canActivate() {
        return !!localStorage.getItem( 'token' );
    }
}
