import { Component, OnInit } from '@angular/core';
import { User } from "app/models/user";
import { Message, SelectItem } from "primeng/primeng";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "app/services/user.service";
import { ConfirmationService, MenuItem } from "primeng/primeng";
import { University } from "app/models/university";
import { UniversityService } from "app/services/university.service";
import { ImageService } from "app/services/image.service";
import { UserHistory } from "app/models/user-history";
import { WorkshopUser } from "app/models/workshop-user";
import { Workshop } from "app/models/workshop";
import { WorkshopService } from "app/services/workshop.service";
import { WorkshopsUserService } from "app/services/workshops-user.service";

@Component( {
    selector: 'admin-enrolment',
    templateUrl: './admin-enrolment.component.html',
    styleUrls: ['./admin-enrolment.component.css']
} )
export class AdminEnrolmentComponent implements OnInit {

    text: string;
    user: User;

    userHistory: UserHistory[];

    msgs: Message[] = [];

    private html: any;
    private imageLoaded: boolean;

    selectedCongressRole: string;
    selectedAcademicTitle: string;
    selectedAcademicStatus: string;
    selectedParticipation: string[] = [];
    selectedMeal: string;

    types: SelectItem[];
    academicTitles: SelectItem[];
    academicStatuses: SelectItem[];
    participationOptions: SelectItem[];
    mealOptions: SelectItem[];

    universities: University[];
    results: string[];

    password1: string;
    password2: string;

    userForm;

    requiredFieldsAlert: boolean;
    saveSuccessAlert: boolean;
    passwordChangedAlert: boolean;
    
    minDate = new Date( 2018, 8, 19, 0, 10, 0, 0 );
    maxDate = new Date( 2018, 8, 23, 0, 10, 0, 0 );

    defaultDate = new Date( 2018, 8, 19, 0, 10, 0, 0 );

    pl: any;
    
    workshopsUsers: WorkshopUser[];

    workshops: Workshop[];

    selectedWorkshops: WorkshopUser[];
    workshopsOptions: SelectItem[];
    
    constructor( private route: ActivatedRoute,
        private router: Router, private userService: UserService, private confirmationService: ConfirmationService, private universityService: UniversityService,
        private imageService: ImageService, private workshopsUserService: WorkshopsUserService,
        private workshopService: WorkshopService ) {


        this.types = [];
        this.types.push( { label: 'Uczestnik', value: 'Uczestnik' } );
        this.types.push( { label: 'Referent', value: 'Referent' } );
        this.types.push( { label: 'Organizator', value: 'Organizator' } );

        this.academicTitles = [];
        this.academicTitles.push( { label: 'mgr', value: '1' } );
        this.academicTitles.push( { label: 'dr', value: '2' } );
        this.academicTitles.push( { label: 'dr hab.', value: '3' } );
        this.academicTitles.push( { label: 'Profesor (stanowisko)', value: '4' } );
        this.academicTitles.push( { label: 'Profesor (tytuł)', value: '5' } );

        this.academicStatuses = [];
        this.academicStatuses.push( { label: 'Student/Doktorant', value: '1' } );
        this.academicStatuses.push( { label: 'Pracownik naukowy', value: '2' } );

        this.participationOptions = [];
        this.participationOptions.push( { label: 'Konferencja', value: '1' } );
        this.participationOptions.push( { label: 'Warsztaty', value: '2' } );

        this.mealOptions = [];
        this.mealOptions.push( { label: 'Standard', value: '1' } );
        this.mealOptions.push( { label: 'Wegetariańskie', value: '2' } );
        this.mealOptions.push( { label: 'Wegańskie', value: '3' } );
        
        this.userForm = [];
        this.userForm.name = 'form-control';
        this.userForm.surname = 'form-control';
        this.userForm.email = 'form-control';

        this.userForm.password1 = 'form-control';
        this.userForm.password2 = 'form-control';
        
        this.pl = {
                firstDayOfWeek: 1,
                dayNames: [ "Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota" ],
                dayNamesShort: [ "Nie","Pn","Wt","Śr","Czw","Pi","So" ],
                dayNamesMin: [ "Nie","Pn","Wt","Śr","Czw","Pi","So" ],
                monthNames: [ "styczeń","luty","marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień" ],
                monthNamesShort: [ "sty","lu","mar","kw","maj","cze","lip","sie","wrz","paź","lis","gru" ],
                today: 'Dzisiaj',
                clear: 'Reset'
            }
    }

    ngOnInit() {
        this.route.data.subscribe(
            ( data: { user: User } ) => {
                if ( data.user ) {

                    console.log( 'Jest ' + data.user )
                    this.user = data.user;

                    this.selectAcademicStatus( this.user );
                    this.selectAcademicTitle( this.user );
                    this.selectCongressRole( this.user );
                    this.selectParticipation();
                    this.selectMeal();
                    this.selectAccommodation()
                    this.selectBooleans
                    
                } else {
                    //TODO Michal error and redirect

                    console.log( 'Ni ma! ' )
                }
            }
        );

        this.loadWorkshops()


        this.loadWorkshopsUser();
        
        window.scrollTo( 0, 0 )
    }

    loadWorkshops() {
        this.workshopService.getWorkshops()
            .subscribe(
            workshops => {
                this.workshops = workshops

                this.setWorkshopItems()
            }, //Bind to view
            err => {
                // Log errors if any
                console.log( err );
            } );
    }

    setWorkshopItems() {
        this.workshopsOptions = [];
        this.selectedWorkshops = [];
        console.log( 'Adding workshop items' )
        if ( this.workshops ) {
            for ( var i = 0; i < this.workshops.length; i++ ) {

                console.log( 'Adding workshop item=' + this.workshops[i].title )

                let name = this.workshops[i].title;
                let id = this.workshops[i].id;
                this.workshopsOptions.push( { label: this.workshops[i].title, value: { fk_user: this.user.id, fk_workshop: this.workshops[i].id } } );

            }
        }
    }

    loadWorkshopsUser() {

        if ( this.user ) {
            this.workshopsUserService.getWorkshopsForUser( this.user.id )
                .subscribe(
                results => {
                    this.workshopsUsers = results
                    
                    this.workshopsOptions.map((item) => {
                        
                        for ( var i = 0; i < this.workshopsUsers.length; i++ ) {
                            
                            if (this.workshopsUsers[i].fk_workshop == item.value.fk_workshop) {
                                
                                this.selectedWorkshops.push(item.value)
                            }
                        }
                    });
                    

                    //this.selectWorkshops()
                }, //Bind to view
                err => {
                    // Log errors if any
                    console.log( err );
                } );
        }
    }
    
    cancel() {
        this.navigateBack();
    }



    confirmDelete() {
        //    this.confirmationService.confirm( {
        //        message: 'Do you want to delete this record?',
        //        header: 'Delete Confirmation',
        //        icon: 'fa fa-trash',
        //        accept: () => {
        //            this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
        //            
        //            this.deleteArticle();
        //        },
        //        reject: () => {
        //            this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
        //        }
        //    } );
    }

    activateArticle() {
        //    this.articleService.activateArticle( this.article ).subscribe(
        //            articles => {
        //                // Emit list event
        //                //                //navigate
        //                //                EmitterService.get( this.listId ).emit( enrolments );
        //                // Empty model
        //
        //                this.navigateBack();
        //
        //            },
        //            err => {
        //                // Log errors if any
        //                console.log( err );
        //            } );
    }

    navigateBack() {
        this.router.navigate( ['/admin'] )
    }


    ///obsluga formularza

    uploadedFiles: File[] = [];

    onUpload( event ) {
        for ( let file of event.files ) {
            this.uploadedFiles.push( file );
        }

        this.msgs = [];
        this.msgs.push( { severity: 'success', summary: 'File Uploaded', detail: '' } );
    }

    getUserHistory() {
        this.userService.getUserHistory( this.user.id )
            .subscribe(
            usersH => this.userHistory = usersH, //Bind to view
            err => {
                // Log errors if any
                console.log( err );
            } );
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

    save() {

        this.requiredFieldsAlert = false;
        this.saveSuccessAlert = false;
        this.passwordChangedAlert = false;

        if ( this.validateUserForm() ) {
            //TODO !!!!!!!!!!!!!!!!!!!!!!!!
            this.user.fk_editor = localStorage.getItem( 'userid' );


            this.setAcademicTitle();
            this.setAcademicStatus();
            this.setCongressRole();
            this.setParticipation();
            this.setMeal();
            this.setAccommodation();

            this.workshopsUserService.deleteWorkshopUser( new WorkshopUser( this.user.id, '' ) ).subscribe(
                    users => {
                        console.log( users );
                    },
                    err => {
                        // Log errors if any
                        console.log( err );
                    } );

                for ( var i = 0; i < this.selectedWorkshops.length; i++ ) {
                    console.log( 'addWorkshopUser=' + this.selectedWorkshops[i].fk_workshop );
                    this.workshopsUserService.addWorkshopUser( new WorkshopUser( this.user.id, this.selectedWorkshops[i].fk_workshop ) ).subscribe(
                        users => {
                            console.log( users );
                        },
                        err => {
                            // Log errors if any
                            console.log( err );
                        } );
                }
                
            this.userService.updateUser( this.user ).subscribe(
                users => {
                    // Emit list event
                    //                //navigate
                    //                EmitterService.get( this.listId ).emit( enrolments );
                    // Empty model

                    //TODO Info

                    this.msgs = [];
                    this.msgs.push( { severity: 'success', summary: 'Zapis zakonczony powodzeniem.', detail: '' } );

                    this.saveSuccessAlert = true;
                    window.scrollTo( 0, 0 )
                },
                err => {
                    //TODO Michal jakis wlasciwy komunikat o errorze
                    this.requiredFieldsAlert = false;
                    // Log errors if any
                    console.log( err );
                } );
        } else {
            this.requiredFieldsAlert = true;

            this.msgs = [];
            this.msgs.push( { severity: 'error', summary: 'Proszę uzupełnic wszystkie obowiązkowe (*) pola.', detail: '' } );
        }

    }

    selectAcademicTitle( user: User ) {
        this.selectedAcademicTitle = this.user.academic_title;

    }

    selectAcademicStatus( user ) {
        this.selectedAcademicStatus = this.user.academic_status;
    }

    setCongressRole() {
        if ( this.selectedCongressRole === 'Uczestnik' ) {
            this.user.congressrole = 'U'
        }

        if ( this.selectedCongressRole === 'Referent' ) {
            this.user.congressrole = 'R'
        }

        if ( this.selectedCongressRole === 'Organizator' ) {
            this.user.congressrole = 'O'
        }
    }

    setParticipation() {
        if ( this.selectedParticipation ) {
            if ( this.selectedParticipation.length === 2 ) {
                this.user.participation = '3';
            } else {
                if ( this.selectedParticipation[0] === '1' ) {
                    this.user.participation = '1';
                }

                if ( this.selectedParticipation[0] === '2' ) {
                    this.user.participation = '2';
                }
            }
        }

    }
    
    setMeal() {
        if ( this.selectedMeal ) {
            
            if ( this.selectedMeal === '1' ) {
                this.user.meal = '1'
            }

            if ( this.selectedMeal === '2' ) {
                this.user.meal = '2'
            }
            
            if ( this.selectedMeal === '3' ) {
                this.user.meal = '3'
            }
            
        }
    }
    
    setAccommodation() {
        if ( this.user.accommodation_from ) {
            this.user.accommodation_from = new Date( this.user.accommodation_from.getTime() + ( 2 * 3600 * 1000 ) )
        }

        if ( this.user.accommodation_to ) {
            this.user.accommodation_to = new Date( this.user.accommodation_to.getTime() + ( 2 * 3600 * 1000 ) )
        }
    }
    
    setAcademicTitle() {
        if ( this.selectedAcademicTitle === '1' ) {
            this.user.academic_title = '1'
        }

        if ( this.selectedAcademicTitle === '2' ) {
            this.user.academic_title = '2'
        }

        if ( this.selectedAcademicTitle === '3' ) {
            this.user.academic_title = '3'
        }

        if ( this.selectedAcademicTitle === '4' ) {
            this.user.academic_title = '4'
        }

        if ( this.selectedAcademicTitle === '5' ) {
            this.user.academic_title = '5'
        }
    }

    selectCongressRole( user: User ) {
        if ( this.user.congressrole === 'U' ) {
            this.selectedCongressRole = 'Uczestnik'
        }

        if ( this.user.congressrole === 'R' ) {
            this.selectedCongressRole = 'Referent'
        }

        if ( this.user.congressrole === 'O' ) {
            this.selectedCongressRole = 'Organizator'
        }
    }

    selectParticipation() {
        if ( this.user.participation === '1' ) {
            this.selectedParticipation[0] = '1'
        }

        if ( this.user.participation === '2' ) {
            this.selectedParticipation[0] = '2'
        }

        if ( this.user.participation === '3' ) {
            this.selectedParticipation[0] = '1'
            this.selectedParticipation[1] = '2'
        }
    }

    selectMeal() {
        this.selectedMeal = this.user.meal;
    }

    selectAccommodation() {
        console.log( 'this.user.accommodation_from=' + this.user.accommodation_from );
        console.log( 'this.user.accommodation_to=' + this.user.accommodation_to );

        if ( this.user.accommodation_from ) {
            this.user.accommodation_from = new Date( this.user.accommodation_from )
        }

        if ( this.user.accommodation_to ) {
            this.user.accommodation_to = new Date( this.user.accommodation_to )
        }
    }
    
    selectBooleans() {
        if ( this.user.accommodation === '0' ) {
            this.user.accommodation = null
        }
        
        if ( this.user.engineer === '0' ) {
            this.user.engineer = null
        }
        
        if ( this.user.invoice === '0' ) {
            this.user.invoice = null
        }
        
        if ( this.user.lactose_intolerance === '0' ) {
            this.user.lactose_intolerance = null
        }
        
        if ( this.user.master === '0' ) {
            this.user.master = null
        }
        
        if ( this.user.gluten_intolerance === '0' ) {
            this.user.gluten_intolerance = null
        }
        
        if ( this.user.smooking_room === '0' ) {
            this.user.smooking_room = null
        }
    }

    setAcademicStatus() {
        if ( this.selectedAcademicStatus === '1' ) {
            this.user.academic_status = '1'
        }

        if ( this.selectedAcademicStatus === '2' ) {
            this.user.academic_status = '2'
        }
    }

    showAcademicTitle() {
        return this.selectedAcademicStatus === '2'
    }

    showStudentOptions() {
        return this.selectedAcademicStatus === '1'
    }
    
    showWorkshops() {
        if ( this.user ) {
            if ( this.selectedParticipation.length === 2 ) {
                return true;
            }

            if ( this.selectedParticipation[0] === '2' ) {
                return true;
            }

        }
    }

    resetChanges() {

        this.requiredFieldsAlert = false;
        this.saveSuccessAlert = false;
        this.passwordChangedAlert = false;

        if ( this.user.id ) {
            this.html = this.imageService.getUserImage( this.user.id );
            this.imageLoaded = true;
        }

        this.userService.get( this.user.id ).subscribe(
            u => this.user = u, //Bind to view
            err => {
                // Log errors if any
                console.log( err );
            } );

        if ( this.user ) {
            this.selectAcademicTitle( this.user );
            this.selectCongressRole( this.user );
        }

        this.userForm = [];
        this.userForm.name = 'form-control';
        this.userForm.surname = 'form-control';
        this.userForm.email = 'form-control';

        this.userForm.password1 = 'form-control';
        this.userForm.password2 = 'form-control';

        this.password1 = null;
        this.password2 = null;
    }

    validateUserForm() {
        var result = true;

        if ( this.isEmpty( this.user.name ) ) {
            result = false;
            this.userForm.name = 'form-control validationError';
        } else {
            this.userForm.name = 'form-control';
        }

        if ( this.isEmpty( this.user.surname ) ) {
            result = false;
            this.userForm.surname = 'form-control validationError';
        } else {
            this.userForm.surname = 'form-control';
        }

        if ( this.isEmpty( this.user.email ) ) {
            result = false;
            this.userForm.email = 'form-control validationError';
        } else {
            this.userForm.email = 'form-control';
        }

        return result;
    }

    changePassword() {
        this.requiredFieldsAlert = false;
        this.saveSuccessAlert = false;
        this.passwordChangedAlert = false;

        if ( this.validatePasswordForm() ) {
            this.user.fk_editor = localStorage.getItem( 'userid' );
            this.user.password = this.password1;

            this.userService.updatePassword( this.user ).subscribe(
                users => {
                    this.msgs = [];
                    this.msgs.push( { severity: 'success', summary: 'Haslo zmienione.', detail: '' } );

                    this.passwordChangedAlert = true;

                    window.scrollTo( 0, 0 )
                },
                err => {
                    // Log errors if any
                    console.log( err );

                    //TODO Michal blad
                    this.requiredFieldsAlert = true;

                    this.msgs = [];
                    this.msgs.push( { severity: 'error', summary: 'Proszę uzupełnic wszystkie obowiązkowe (*) pola.', detail: '' } );

                    window.scrollTo( 0, 0 )
                } );
        } else {
            this.requiredFieldsAlert = true;

            this.msgs = [];
            this.msgs.push( { severity: 'error', summary: 'Proszę uzupełnic wszystkie obowiązkowe (*) pola.', detail: '' } );
        }
    }

    validatePasswordForm() {
        var result = true;

        if ( this.isEmpty( this.password1 ) ) {
            result = false;
            this.userForm.password1 = 'form-control validationError';
        } else {
            this.userForm.password1 = 'form-control';
        }

        if ( this.isEmpty( this.password2 ) ) {
            result = false;
            this.userForm.password2 = 'form-control validationError';
        } else {
            this.userForm.password2 = 'form-control';
        }

        if ( this.password1 != this.password2 ) {
            result = false;
            this.userForm.password1 = 'form-control validationError';
            this.userForm.password2 = 'form-control validationError';
        }

        return result;
    }

    requiredFieldsAlertVisible() {
        return this.requiredFieldsAlert
    }

    saveSuccessAlertVisible() {
        return this.saveSuccessAlert
    }

    passwordChangedAlertVisible() {
        return this.passwordChangedAlert
    }

    isEmpty( str ) {
        return ( !str || 0 === str.length );
    }

    isAcceptationPending() {
        if ( 'Y' == this.user.confirmation || 'N' == this.user.confirmation ) {
            return false;
        }

        return true;
    }

    isAccepted() {
        if ( 'Y' == this.user.confirmation ) {
            return true;
        }

        return false;
    }



    isRejected() {
        if ( 'N' == this.user.confirmation ) {
            return true;
        }

        return false;
    }

    isPaymentAccepted() {
        if ( 'Y' == this.user.payment_accepted ) {
            return true;
        }

        return false;

    }

    isPaymentAcceptationPending() {
        if ( 'Y' == this.user.payment_accepted ) {
            return false;
        }

        return true;
    }

    accept() {
        //TODO refresh lub dymek
        this.userService.acceptUser( this.user ).subscribe(
            response => {


                if ( response.text() === 'OK' ) {
                    -                    console.log( 'udalo sie accepted ' + response.text() );
                    //           
                    this.user.confirmation = 'Y'
                }
            },
            err => {
                // Log errors if any
                console.log( err );
            } );
    }

    acceptPayment() {
        //TODO refresh lub dymek
        this.userService.acceptPayment( this.user ).subscribe(
            response => {


                if ( response.text() === 'OK' ) {
                    -                    console.log( 'udalo sie accepted ' + response.text() );
                    //           
                    this.user.payment_accepted = 'Y'
                }
            },
            err => {
                // Log errors if any
                console.log( err );
            } );
    }

    confirmPaymentReject() {
        this.confirmationService.confirm( {
            message: 'Czy na pewno chcesz anulowac status platnosci?',
            header: 'Potwierdz odrzucenie',
            icon: 'fa fa-trash',
            accept: () => {
                this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Status anulowany' }];

                this.rejectPayment();
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'Anulowano' }];
            }
        } );
    }

    confirmReject() {
        this.confirmationService.confirm( {
            message: 'Czy na pewno chcesz odrzucic zgloszenie?',
            header: 'Potwierdz odrzucenie',
            icon: 'fa fa-trash',
            accept: () => {
                this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Zgloszenie odrzucone' }];

                this.reject();
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'Anulowano' }];
            }
        } );
    }

    reject() {
        //TODO refresh lub dymek
        this.userService.rejectUser( this.user ).subscribe(
            response => {


                if ( response.text() === 'OK' ) {
                    -                    console.log( 'udalo sie rejected ' + response.text() );

                    this.user.confirmation = 'N'
                    //           
                }
            },
            err => {
                // Log errors if any
                console.log( err );
            } );
    }

    rejectPayment() {
        //TODO refresh lub dymek
        this.userService.rejectPayment( this.user ).subscribe(
            response => {


                if ( response.text() === 'OK' ) {
                    -                    console.log( 'udalo sie rejected ' + response.text() );

                    this.user.payment_accepted = 'N'
                    //           
                }
            },
            err => {
                // Log errors if any
                console.log( err );
            } );
    }

    showAccomodation() {
        console.log( 'this.user.accommodation=' + this.user.accommodation );
        return this.user.accommodation === '1' || this.user.accommodation
    }
}
