import { Component, OnInit } from '@angular/core';
import { Message } from "primeng/primeng";
import { RequestOptions, Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ImageService } from "app/services/image.service";
import { UserService } from "app/services/user.service";
import { User } from "app/models/user";
import { Router } from "@angular/router";
import { AuthenticationService } from "app/services/authentication.service";

@Component( {
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
} )
export class UserProfileComponent implements OnInit {

    private html: any;
    private userId: string;

    private imageLoaded: boolean;

    private user: User;

    constructor( private imageService: ImageService, private userService: UserService,
            private authenticationService: AuthenticationService, public router: Router) {
        this.userId = this.userService.getLoggedUserId();
        
        //todo tylko dla testow, poprawic logowanie
        this.userId = '1';
    }

    ngOnInit() {

        if ( this.userId ) {
            this.html = this.imageService.getUserImage( this.userId );
            this.imageLoaded = true;
        }
        
        this.userService.get(this.userId).subscribe(
                u => this.user = u, //Bind to view
                err => {
                    // Log errors if any
                    console.log( err );
                } );
    }

    msgs: Message[];

    uploadedFiles: File[] = [];

    onUpload( event ) {
        for ( let file of event.files ) {
            this.uploadedFiles.push( file );
        }

        this.msgs = [];
        this.msgs.push( { severity: 'success', summary: 'File Uploaded', detail: '' } );
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate( ['login-register'] );
    }
    
    get diagnostic() { return JSON.stringify( this.user ); }
    
    get diagnosticUserId() { return this.userId; }


}
