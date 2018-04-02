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

    forgotForm;

    emailNotFoundAlert: boolean;
    passwordSentAlert: boolean;
    
    constructor( private contactService: ContactService ) {
        this.forgotForm = [];
        this.forgotForm.email = 'input full';
    }

    ngOnInit() {
    }



    submitPassword() {

        this.emailNotFoundAlert = false;
        this.passwordSentAlert = false;
        
        if ( this.validateLoginForm() === true ) {
            //todo obsluga bledow nie znaleziono, wyslano
            if ( this.isEmpty( this.email ) ) {
            } else {

                var forgotMessage = new ForgotPasswordMessage( this.email );
                this.contactService.sendPassword( forgotMessage ).subscribe(
                    response => {
                        this.msgs = [];
                        this.msgs.push( { severity: 'success', summary: 'Email z hasłem został dostarczony.', detail: '' } );

                        this.passwordSentAlert = true;
                        
                    },
                    err => {
                        this.msgs = [];
                        // Log errors if any
                        this.msgs.push( { severity: 'error', summary: 'Nie znaleziono takiego użytkownika.', detail: '' } );
                        //console.log( err );
                            console.log( "Email not found" + err );
                            this.emailNotFoundAlert = true;
                    } );
            }
        }

    }

    validateLoginForm() {
        var result = true;

        if ( this.isEmpty( this.email ) ) {
            result = false;
            this.forgotForm.email = 'input full validationError';
        } else {
            if ( this.validateEmail( this.email ) === true ) {
                this.forgotForm.email = 'input full';
            } else {
                this.forgotForm.email = 'input full validationError';
                result = false;
            }
        }

        return result;
    }

    emailNotFoundAlertVisible() {
        return this.emailNotFoundAlert
    }
    
    passwordSentAlertVisible() {
        return this.passwordSentAlert
    }
    
    validateEmail( email ) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test( String( email ).toLowerCase() );
    }

    isEmpty( str ) {
        return ( !str || 0 === str.length );
    }
}
