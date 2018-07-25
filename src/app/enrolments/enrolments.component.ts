import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User } from "app/models/user";
import { UserService } from '../services/user.service';
import { EmitterService } from '../services/emitter.service';
import { LocalDataSource } from "ng2-smart-table/ng2-smart-table";

import { Observable } from "rxjs";
import { DatePipe } from "@angular/common";
import { ActionAdminEnrolmentComponent } from "app/action-admin-enrolment/action-admin-enrolment.component";
import { ActionAdminPaymentComponent } from "app/action-admin-payment/action-admin-payment.component";
import { UserInfoService } from "app/services/user-info.service";
import { UserInfo } from "app/models/user-info";


@Component( {
    selector: 'enrolments',
    templateUrl: './enrolments.component.html',
    styleUrls: ['./enrolments.component.css']
} )
export class EnrolmentsComponent implements OnInit, OnChanges {
    // Local properties
    users: User[];
    // Input properties
    @Input() listId: string;
    @Input() editId: string;

    source: LocalDataSource;

    showAllEnabled: boolean;
    showAcceptedEnabled: boolean;
    showPendingEnabled: boolean;
    showSpeakersEnabled: boolean;
    showRejectedEnabled: boolean;
    showPaymentPendingEnabled: boolean;
    showPaymentAcceptedEnabled: boolean;
    showWorkhopEnabled: boolean;
    showInvoiceEnabled: boolean;

    enrolmentsCount: string;
    userInfo: UserInfo;

    // Constructor with injected service
    constructor( private userService: UserService, private userInfoService: UserInfoService ) { }

    ngOnInit() {
        // Load enrolments

        this.source = new LocalDataSource();

        this.userService.getUsers().toPromise().then(( data ) => {
            this.source.load( data );
        } );

        this.getAllInfo();

        this.showAllEnabled = true;

        window.scrollTo( 0, 0 )
    }
    
    loadAllEnrolments() {
        // Get all enrolments
        this.userService.getUsers()
            .subscribe(
            enrolments => this.users = enrolments, //Bind to view
            err => {
                // Log errors if any
                console.log( err );
            } );
    }

    ngOnChanges( changes: any ) {
        // Listen to the 'list'emitted event so as populate the model
        // with the event payload
        EmitterService.get( this.listId ).subscribe(( enrolments: User[] ) => { this.loadAllEnrolments() } );

    }

    settings = {
        columns: {
            name: {
                title: 'Imie'
            },
            surname: {
                title: 'Nazwisko'
            },
            email: {
                title: 'Email'
            },
            university: {
                title: 'Uniwersytet'
            },
            registerdate: {
                title: 'Data zgloszenia',
                type: 'html',
                valuePrepareFunction: ( value ) => {
                    var datePipe = new DatePipe( 'pl-PL' );
                    return datePipe.transform( value, 'dd.MM.yyyy' );
                }
            },
            congressrole: {
                title: 'Rola',
                type: 'html',
                valuePrepareFunction: ( value ) => {
                    if ( value === 'U' ) return 'Uczestnik';
                    if ( value === 'R' ) return 'Referent';
                    if ( value === 'O' ) return 'Organizator';
                    return ''
                },
                filterFunction( cell?: any, search?: string ): boolean {
                    if ( search != null ) {
                        if ( "uczestnik".search( search ) > 0 ) {
                            if ( cell === 'U' ) {
                                return true;
                            }

                            return false;
                        }

                        if ( "referent".search( search ) > 0 ) {
                            if ( cell === 'R' ) {
                                return true;
                            }

                            return false;
                        }

                        if ( "organizator".search( search ) > 0 ) {
                            if ( cell === 'U' ) {
                                return true;
                            }

                            return false;
                        }
                    }
                    if ( search === '' ) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            academic_title: {
                title: 'Tytul',
                type: 'html',
                valuePrepareFunction: ( value ) => {
                    if ( value === '1' ) return 'mgr';
                    if ( value === '2' ) return 'dr';
                    if ( value === '3' ) return 'dr hab.';
                    if ( value === '4' ) return 'Prof. (stan.)';
                    if ( value === '5' ) return 'Prof.';
                    
                    return ''
                }
            },
            payment: {
                title: 'Oplata',
                type: 'custom',
                renderComponent: ActionAdminPaymentComponent,
                valuePrepareFunction: ( cell, row ) => {
                    return row
                }
            },
            confirmation: {
                title: 'Akceptacja',
                type: 'html',
                valuePrepareFunction: ( value ) => {
                    if ( value === 'Y' ) return 'Tak';
                    if ( value === 'N' ) return 'Nie';
                    return 'Oczekuje'
                }
            },
            action: {
                title: 'Akcja',
                type: 'custom',
                renderComponent: ActionAdminEnrolmentComponent,
                valuePrepareFunction: ( cell, row ) => {
                    return row
                }
            }
        },
        actions: false
    };

    
    settingsInvoice = {
            columns: {
                name: {
                    title: 'Imie'
                },
                surname: {
                    title: 'Nazwisko'
                },
                email: {
                    title: 'Email'
                },
                payment: {
                    title: 'Oplata',
                    type: 'custom',
                    renderComponent: ActionAdminPaymentComponent,
                    valuePrepareFunction: ( cell, row ) => {
                        return row
                    }
                },
                invoice_data: {
                    title: 'Dane do faktury'
                },
                action: {
                    title: 'Akcja',
                    type: 'custom',
                    renderComponent: ActionAdminEnrolmentComponent,
                    valuePrepareFunction: ( cell, row ) => {
                        return row
                    }
                }
            },
            actions: false
        };
    
    showAll() {
        this.userService.getUsers().toPromise().then(( data ) => {
            this.source.load( data );
        } );

        this.resetButtons();
        this.showAllEnabled = true;
        
        this.getAllInfo();
    }

    getAllInfo() {
        this.userInfoService.getAllUsersInfo().subscribe(
                data => {this.userInfo = data
                    console.log ('data= ' + data)
                console.log ('Ilosc= ' + data.count)    
                
                }, //Bind to view
                err => {
                    // Log errors if any
                    console.log( err );
                } );
    }
    
    showAcepted() {
        this.userService.getAcceptedUsers().toPromise().then(( data ) => {
            this.source.load( data );
        } );

        this.resetButtons();
        this.showAcceptedEnabled = true;
        
        this.getAcceptedInfo();
    }
    
    getAcceptedInfo() {
        this.userInfoService.getAcceptedUsersInfo().subscribe(
                data => {this.userInfo = data
                    console.log ('data= ' + data)
                console.log ('Ilosc= ' + data.count)    
                
                }, //Bind to view
                err => {
                    // Log errors if any
                    console.log( err );
                } );
    }

    showPending() {
        this.userService.getPendingUsers().toPromise().then(( data ) => {
            this.source.load( data );
        } );

        this.resetButtons();
        this.showPendingEnabled = true;
        
        this.getPendingInfo();
    }
    
    getPendingInfo() {
        this.userInfoService.getPendingUsersInfo().subscribe(
                data => {this.userInfo = data
                    console.log ('data= ' + data)
                console.log ('Ilosc= ' + data.count)    
                
                }, //Bind to view
                err => {
                    // Log errors if any
                    console.log( err );
                } );
    }

    showRejected() {
        this.userService.getRejectedUsers().toPromise().then(( data ) => {
            this.source.load( data );
        } );

        this.resetButtons();
        this.showRejectedEnabled = true;
        
        this.getRejectedInfo();
    }

    getRejectedInfo() {
        this.userInfoService.getRejectedUsersInfo().subscribe(
                data => {this.userInfo = data
                    console.log ('data= ' + data)
                console.log ('Ilosc= ' + data.count)    
                
                }, //Bind to view
                err => {
                    // Log errors if any
                    console.log( err );
                } );
    }
    
    showSpeakers() {
        this.userService.getSpeakers().toPromise().then(( data ) => {
            this.source.load( data );
        } );

        this.resetButtons();
        this.showSpeakersEnabled = true;
        
        this.getSpeakersInfo();
    }
    
    getSpeakersInfo() {
        this.userInfoService.getSpeakersUsersInfo().subscribe(
                data => {this.userInfo = data
                    console.log ('data= ' + data)
                console.log ('Ilosc= ' + data.count)    
                
                }, //Bind to view
                err => {
                    // Log errors if any
                    console.log( err );
                } );
    }

    showPaymentAccepted() {
        this.userService.getAcceptedPayment().toPromise().then(( data ) => {
            this.source.load( data );
        } );

        this.resetButtons();
        this.showPaymentAcceptedEnabled = true;
        
        this.getPaymentAcceptedInfo();
    }
    
    getPaymentAcceptedInfo() {
        this.userInfoService.getPaymentAcceptedUsersInfo().subscribe(
                data => {this.userInfo = data
                    console.log ('data= ' + data)
                console.log ('Ilosc= ' + data.count)    
                
                }, //Bind to view
                err => {
                    // Log errors if any
                    console.log( err );
                } );
    }

    showPaymentPending() {
        this.userService.getPendingPayment().toPromise().then(( data ) => {
            this.source.load( data );
        } );

        this.resetButtons();
        this.showPaymentPendingEnabled = true;
        
        this.getPaymentPendingInfo();
    }
    
    getPaymentPendingInfo() {
        this.userInfoService.getPaymentPendingUsersInfo().subscribe(
                data => {this.userInfo = data
                    console.log ('data= ' + data)
                console.log ('Ilosc= ' + data.count)    
                
                }, //Bind to view
                err => {
                    // Log errors if any
                    console.log( err );
                } );
    }

    showWorkshop() {
        this.userService.getWorkshop().toPromise().then(( data ) => {
            this.source.load( data );
        } );

        this.resetButtons();
        this.showWorkhopEnabled = true;
        
        this.getWorkshopInfo();
    }
    
    getWorkshopInfo() {
        this.userInfoService.getWorkshopUsersInfo().subscribe(
                data => {this.userInfo = data
                    console.log ('data= ' + data.count)
                console.log ('Ilosc= ' + data.count)    
                
                }, //Bind to view
                err => {
                    // Log errors if any
                    console.log( err );
                } );
    }

    showInvoice() {
        this.userService.getInvoice().toPromise().then(( data ) => {
            this.source.load( data );
        } );

        this.resetButtons();
        this.showInvoiceEnabled = true;
        
        this.getInvoiceInfo();
    }
    
    getInvoiceInfo() {
        this.userInfoService.getInvoiceUsersInfo().subscribe(
                data => {this.userInfo = data
                    console.log ('data= ' + data)
                console.log ('Ilosc= ' + data.count)    
                
                }, //Bind to view
                err => {
                    // Log errors if any
                    console.log( err );
                } );
    }
    
    resetButtons() {
        this.showAllEnabled = false;
        this.showAcceptedEnabled = false;
        this.showPendingEnabled = false;
        this.showSpeakersEnabled = false;
        this.showRejectedEnabled = false;
        this.showPaymentPendingEnabled = false;
        this.showPaymentAcceptedEnabled = false;
        this.showWorkhopEnabled = false;
        this.showInvoiceEnabled = false;
    }
}
