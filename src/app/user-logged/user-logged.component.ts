import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "app/services/authentication.service";
import { Router } from "@angular/router";

@Component( {
    selector: 'user-logged',
    templateUrl: './user-logged.component.html',
    styleUrls: ['./user-logged.component.css']
} )
export class UserLoggedComponent implements OnInit {

    private username: string;

    constructor(private authenticationService: AuthenticationService, public router: Router) { }
    
    ngOnInit() {
        this.username = localStorage.getItem( 'username' );
    }
    
    isLogged() {
        this.username = localStorage.getItem( 'username' );
        return ( this.username );
    }
    
    logout() {
        this.authenticationService.logout();
        this.router.navigate( ['welcome'] );
    }

}
