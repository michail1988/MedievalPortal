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
    
    selectedCongressRole: string;
    selectedAcademicTitle: string;
    
    types: SelectItem[];
    academicTitles: SelectItem[];

    universities: University[];
    results: string[];
    
    constructor( private imageService: ImageService, private userService: UserService, private universityService: UniversityService,
        private authenticationService: AuthenticationService, public router: Router ) {
        this.userId = this.userService.getLoggedUserId();

        this.types = [];
        this.types.push( { label: 'Uczestnik', value: 'Uczestnik' } );
        this.types.push( { label: 'Referent', value: 'Referent' } );
        this.types.push( { label: 'Organizator', value: 'Organizator' } );
        
        this.academicTitles = [];
        this.academicTitles.push( { label: 'mgr', value: 'mgr' } );
        this.academicTitles.push( { label: 'Doktorant', value: 'Doktorant' } );
        this.academicTitles.push( { label: 'dr', value: 'dr' } );
        this.academicTitles.push( { label: 'dr hab.', value: 'dr hab.' } );
        this.academicTitles.push( { label: 'Profesor', value: 'Profesor' } );
        
        //todo tylko dla testow, poprawic logowanie
//        this.userId = '1';
        //TODO Michal 
        
        this.selectedCongressRole = 'Uczestnik';
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
        
        if (this.user) {
            this.selectAcademicTitle(this.user);
        }
        
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
        
        //TODO
        this.user.fk_editor = this.user.id;
        this.setAcademicTitle();
        this.setCongressRole();

        this.userService.updateUser( this.user ).subscribe(
            users => {
                // Emit list event
                //                //navigate
                //                EmitterService.get( this.listId ).emit( enrolments );
                // Empty model

                //TODO Info

            },
            err => {
                // Log errors if any
                console.log( err );
            } );
    }

    selectAcademicTitle(user: User) {
        if (this.user.academic_title === '1') {
            this.selectedAcademicTitle = 'mgr'
        }
        
        if (this.user.academic_title === '2') {
            this.selectedAcademicTitle = 'Doktorant'
        }
        
        if (this.user.academic_title === '3') {
            this.selectedAcademicTitle = 'dr'
        }
        
        if (this.user.academic_title === '4') {
            this.selectedAcademicTitle = 'dr hab.'
        }
        
        if (this.user.academic_title === '5') {
            this.selectedAcademicTitle = 'Profesor'
        }
    }
    
    selectCongressRole(user: User) {
        if (this.user.congressrole === 'U') {
            this.selectedCongressRole = 'Uczestnik'
        }
        
        if (this.user.congressrole === 'R') {
            this.selectedCongressRole = 'Referent'
        }
        
        if (this.user.congressrole === 'O') {
            this.selectedCongressRole = 'Organizator'
        }
    }
    
    setAcademicTitle() {
        if (this.selectedAcademicTitle === 'mgr') {
            this.user.academic_title = '1'
        }
        
        if (this.selectedAcademicTitle === 'Doktorant') {
            this.user.academic_title = '2'
        }
        
        if (this.selectedAcademicTitle === 'dr') {
            this.user.academic_title = '3'
        }
        
        if (this.selectedAcademicTitle === 'dr hab.') {
            this.user.academic_title = '4'
        }
        
        if (this.selectedAcademicTitle === 'Profesor') {
            this.user.academic_title = '5'
        }
    }
    
    setCongressRole() {
        if (this.selectedCongressRole === 'Uczestnik') {
            this.user.congressrole = 'U'
        }
        
        if (this.selectedCongressRole === 'Referent') {
            this.user.congressrole = 'R'
        }
        
        if (this.selectedCongressRole === 'Organizator') {
            this.user.congressrole = 'O'
        }
    }
    
    resetChanges() {
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
        
        if (this.user) {
            this.selectAcademicTitle(this.user);
            this.selectCongressRole(this.user);
        }
    }
}
