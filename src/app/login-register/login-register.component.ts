import { Component, OnInit } from '@angular/core';
import { SelectItem } from "primeng/primeng";

@Component( {
    selector: 'app-login-register',
    templateUrl: './login-register.component.html',
    styleUrls: ['./login-register.component.css']
} )
export class LoginRegisterComponent implements OnInit {

    loginTabVisible: boolean;
    speakerPartsVisible: boolean;
    types: SelectItem[];

    selectedType: string;

    constructor() {
        this.loginTabVisible = false;
        this.speakerPartsVisible = false;

        this.types = [];
        this.types.push( { label: 'Participant', value: 'Participant' } );
        this.types.push( { label: 'Speaker', value: 'Speaker' } );
        this.types.push( { label: 'Organizer', value: 'Organizer' } );
        
        this.selectedType = 'Participant';
    }

    ngOnInit() {
    }

    changeToLogin() {
        this.loginTabVisible = true;
    }

    changeToRegister() {
        this.loginTabVisible = false;
    }
    
    isSpeakerPartsVisible() {
        return this.selectedType === 'Speaker';
    }
}
