import { Component, OnInit } from '@angular/core';
import { ContactService } from "app/services/contact.service";
import { ForgotPasswordMessage } from "app/models/forgot-password-message";
import { Message } from "primeng/primeng";

@Component( {
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
} )
export class ForgotPasswordComponent implements OnInit {

    email: string;

    msgs: Message[];

    constructor( private contactService: ContactService ) { }

    ngOnInit() {
    }

    submitPassword() {
        //todo email not empty
        //todo obsluga bledow nie znaleziono, wyslano
        if ( this.isEmpty( this.email ) ) {
        } else {

            var forgotMessage = new ForgotPasswordMessage( this.email );
            this.contactService.sendPassword( forgotMessage ).subscribe(
                response => {
                    this.msgs = [];
                    this.msgs.push( { severity: 'success', summary: 'Email z hasłem został dostarczony.', detail: '' } );

                    // this.submitted = true;
                },
                err => {
                    this.msgs = [];
                    // Log errors if any
                    this.msgs.push( { severity: 'error', summary: 'Nie znaleziono takiego użytkownika.', detail: '' } );
                    //console.log( err );
                } );
        }

    }

    isEmpty( str ) {
        return ( !str || 0 === str.length );
    }
}
