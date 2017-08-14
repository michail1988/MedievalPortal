import { Component, OnInit } from '@angular/core';

@Component( {
    selector: 'user-logged',
    templateUrl: './user-logged.component.html',
    styleUrls: ['./user-logged.component.css']
} )
export class UserLoggedComponent implements OnInit {

    private username: string;

    constructor() { }
    
    ngOnInit() {
        this.username = localStorage.getItem( 'username' );
    }
    
    isLogged() {
        this.username = localStorage.getItem( 'username' );
        return ( this.username );
    }

}
