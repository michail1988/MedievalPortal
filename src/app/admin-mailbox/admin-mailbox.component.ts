import { Component, OnInit } from '@angular/core';
import { ContactMessage } from "app/models/contact-message";
import { ContactService } from "app/services/contact.service";
import { Message } from "primeng/primeng";

import { SelectItem } from 'primeng/primeng';
import { UserService } from "app/services/user.service";
import { User } from "app/models/user";

interface Address {
    name: string,
    code: string
}

@Component( {
    selector: 'admin-mailbox',
    templateUrl: './admin-mailbox.component.html',
    styleUrls: ['./admin-mailbox.component.css']
} )
// css: https://www.sanwebe.com/2014/08/css-html-forms-designs/comment-page-1#comments
export class AdminMailboxComponent implements OnInit {

    contactMessage = new ContactMessage( '', '', '', '', null );

    msgs: Message[];

    submitted = false;

    selectedAddresses: Address[];

    users: User[];

    addressees: SelectItem[];

    showAllEnabled: boolean;
    showAcceptedEnabled: boolean;
    showNotAcceptedEnabled: boolean;
    showSpeakersEnabled: boolean;
    showPaymentPendingEnabled: boolean;
    showPaymentAcceptedEnabled: boolean;

    constructor( private contactService: ContactService, private userService: UserService ) {


    }

    ngOnInit() {
        this.showAll();
    }

    submitMessage() {

        this.contactMessage.date = new Date();
        this.contactMessage.email = ''

        this.contactMessage.email = this.contactMessage.email.replace( /\n/g, "<br />" );

        for ( var i = 0; i < this.selectedAddresses.length; i++ ) {

            if ( this.isEmpty( this.contactMessage.email ) ) {
                this.contactMessage.email = this.selectedAddresses[i].code;
            } else {
                this.contactMessage.email = this.contactMessage.email + ', ' + this.selectedAddresses[i].code;
            }
        }

        console.log( 'Wysylam do ' + this.contactMessage.email );
        this.contactService.sendAdminMessages( this.contactMessage ).subscribe(
            response => {
                this.msgs = [];
                this.msgs.push( { severity: 'success', summary: 'Email dostarczony.', detail: '' } );

                this.submitted = true;
            },
            err => {
                // Log errors if any
                this.msgs.push( { severity: 'error', summary: 'Nie udalo sie=' + err, detail: '' } );
                console.log( err );
            } );


    }

    showAll() {
        this.userService.getUsers()
            .subscribe(
            allUsers => {
                this.users = allUsers;
                this.setItems();
            },
            err => {
                console.log( err );
            } );

        this.setItems();

        this.resetButtons();
        this.showAllEnabled = true;
    }

    showAcepted() {
        this.userService.getAcceptedUsers()
            .subscribe(
            acceptedUsers => {
                this.users = acceptedUsers;
                this.setItems();
            },
            err => {
                console.log( err );
            } );

        this.setItems();

        this.resetButtons();
        this.showAcceptedEnabled = true;
    }

    showNotAccepted() {
        this.userService.getPendingUsers()
            .subscribe(
            notAcceptedUsers => {
                this.users = notAcceptedUsers;
                this.setItems();
            },
            err => {
                console.log( err );
            } );

        this.setItems();

        this.resetButtons();
        this.showNotAcceptedEnabled = true;
    }

    showPaymentAccepted() {
        this.userService.getAcceptedPayment()
            .subscribe(
            acceptedPaymentUsers => {
                this.users = acceptedPaymentUsers;
                this.setItems();
            },
            err => {
                console.log( err );
            } );

        this.setItems();

        this.resetButtons();
        this.showPaymentAcceptedEnabled = true;
    }

    showPaymentPending() {
        this.userService.getPendingPayment()
            .subscribe(
            pendingPaymentUsers => {
                this.users = pendingPaymentUsers;
                this.setItems();
            },
            err => {
                console.log( err );
            } );

        this.setItems();

        this.resetButtons();
        this.showPaymentPendingEnabled = true;
    }

    showSpeakers() {
        this.userService.getSpeakers()
            .subscribe(
            speakers => {
                this.users = speakers;
                this.setItems();
            },
            err => {
                console.log( err );
            } );

        this.setItems();

        this.resetButtons();
        this.showSpeakersEnabled = true;
    }

    setItems() {
        this.addressees = [];
        this.selectedAddresses = [];

        if ( this.users ) {
            for ( var i = 0; i < this.users.length; i++ ) {

                let name = this.users[i].name + ' ' + this.users[i].surname;
                this.addressees.push( { label: name, value: { id: i + 1, name: name, code: this.users[i].email } } );

            }
        }

        this.addressees.sort();
    }

    isEmpty( str ) {
        return ( !str || 0 === str.length );
    }

    resetButtons() {
        this.showAllEnabled = false;
        this.showAcceptedEnabled = false;
        this.showNotAcceptedEnabled = false;
        this.showSpeakersEnabled = false;
        this.showPaymentPendingEnabled = false;
        this.showPaymentAcceptedEnabled = false;

    }
}
