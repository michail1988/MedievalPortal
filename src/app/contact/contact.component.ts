import { Component, OnInit, ElementRef } from '@angular/core';
import { ContactService } from "app/services/contact.service";
import { ContactMessage } from "app/models/contact-message";
import { Message } from "primeng/primeng";

@Component( {
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
} )
//todo dymek potwierdzajacy, message z pelnym html z textarea

export class ContactComponent implements OnInit {

    contactMessage = new ContactMessage( '', '', '', '', null );
    
    msgs: Message[];
    
    submitted = false;

    constructor( private contactService: ContactService ) { }

    ngOnInit() {
        window.scrollTo(0, 0)
    }

    submitMessage() {

        this.contactMessage.message = 'Wiadomosc z formularza kontaktowego od ' + this.contactMessage.name
        + ' ' + this.contactMessage.email + '\n\n' + this.contactMessage.message
        
        this.contactMessage.date = new Date();
        this.contactService.addMessage( this.contactMessage ).subscribe(
            res => {

                this.msgs = [];
                this.msgs.push( { severity: 'success', summary: 'Email dostarczony.', detail: '' } );
                
                this.submitted = true;
            },
            err => {
                // Log errors if any
                console.log( err );
            } );


    }

}
