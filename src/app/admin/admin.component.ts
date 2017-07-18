import { Component, OnInit } from '@angular/core';
import { isLoggedin } from '../services/is-loggedin';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component( {
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
} )

export class AdminComponent {

    constructor( public authenticationService: AuthenticationService, public router: Router ) { }

    onLogout() {
        this.authenticationService.logout()
            .subscribe(
            () => this.router.navigate( ['login'] ),
        );
    }
    
    text: string;

}
