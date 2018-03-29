import { Component, OnInit } from '@angular/core';
import { Message, SelectItem } from "primeng/primeng";
import { RequestOptions, Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ImageService } from "app/services/image.service";
import { UserService } from "app/services/user.service";
import { User } from "app/models/user";
import { Router } from "@angular/router";
import { AuthenticationService } from "app/services/authentication.service";
import { UniversityService } from "app/services/university.service";
import { University } from "app/models/university";

@Component( {
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
} )
export class UserProfileComponent implements OnInit {

    private html: any;
    private userId: string;

    private imageLoaded: boolean;

    user = new User( '', '', '', null, '', '', '', '', '', '', '', '', '', '', '', '', '', '' );
    
    selectedType: string;
    
    types: SelectItem[];

    universities: University[];
    results: string[];
    
    constructor( private imageService: ImageService, private userService: UserService, private universityService: UniversityService,
        private authenticationService: AuthenticationService, public router: Router ) {
        this.userId = this.userService.getLoggedUserId();

        this.types = [];
        this.types.push( { label: 'Uczestnik', value: 'Uczestnik' } );
        this.types.push( { label: 'Referent', value: 'Referent' } );
        this.types.push( { label: 'Organizator', value: 'Organizator' } );
        
        //todo tylko dla testow, poprawic logowanie
//        this.userId = '1';
        //TODO Michal 
        
        this.selectedType = 'Uczestnik';
    }

    ngOnInit() {

        if ( this.userId ) {
            this.html = this.imageService.getUserImage( this.userId );
            this.imageLoaded = true;
        }

        this.userService.get( this.userId ).subscribe(
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
    
    search( event ) {
        //      EmitterService.get( this.listId ).subscribe(( universities: University[] ) => { this.loadUniversities() } );


        this.loadUniversities();
        //todo dziala wolno, jakby co drugi znak
        if ( this.universities ) {

            this.results = this.universities.map( function( uni ) {
                return uni.name;
            } )
        }
        ;
    }
    
    loadUniversities() {
        // Get all enrolments
        this.universityService.getUniversities( this.user.university )
            .subscribe(
            universities => this.universities = universities, //Bind to view
            err => {
                // Log errors if any
                console.log( err );
            } );

        console.log( this.universities );
    }

    get diagnostic() { return JSON.stringify( this.user ); }

    get diagnosticUserId() { return this.userId; }

    get userData() { return this.user; }


    save() {
    }


}
