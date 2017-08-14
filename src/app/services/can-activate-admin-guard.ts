import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { isLoggedin } from '../services/is-loggedin';

//TODO user obiekt with admin priv
@Injectable()
export class CanActivateAdminGuard {
    
    constructor() { }

    canActivate() {
        return !!localStorage.getItem( 'admintoken' );
    }
}
