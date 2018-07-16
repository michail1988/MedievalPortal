import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from "ng2-smart-table/ng2-smart-table";
import { Workshop } from "app/models/workshop";
import { WorkshopService } from "app/services/workshop.service";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";


@Component( {
    selector: 'admin-workshops',
    templateUrl: './admin-workshops.component.html',
    styleUrls: ['./admin-workshops.component.css']
} )
export class AdminWorkshopsComponent implements OnInit {

    workshops: Workshop[];
    source: LocalDataSource;
    activeWorkshopView: boolean;

    constructor( private workshopService: WorkshopService, private router: Router ) {
        this.source = new LocalDataSource();

        this.workshopService.getWorkshops().toPromise().then(( data ) => {
            this.source.load( data );
        } );

        this.activeWorkshopView = true;
    }

    ngOnInit() {
        window.scrollTo( 0, 0 )
    }

    loadWorkshops() {
        this.workshopService.getWorkshops().toPromise().then(( data ) => {
            this.source.load( data );
        } );
    }

    loadDeletedWorkshops() {
        this.workshopService.getDeletedWorkshops().toPromise().then(( data ) => {
            this.source.load( data );
        } );
    }

    settings = {
        columns: {
            title: {
                title: 'Tytul'
            },
            author: {
                title: 'Autor'
            },
            date: {
                title: 'Data'
            },
            //TODO wpasowac w routingAdmin admin/(adminRouting:admin-articles)
            //return '<a href="/admin-article/' + row.id + '">Edytuj</a>'
            link: {
                title: 'Akcja',
                type: 'html',
                valuePrepareFunction: ( cell, row ) => {
                    return '<a href="/admin-workshop/' + row.id + '">Edytuj</a>'
                }
            },
            //            button: {
            //                title: 'Button',
            //                type: 'custom',
            //                renderComponent: AdminTableButtonComponent,
            //                onComponentInitFunction(instance) {
            //                  instance.save.subscribe(row => {
            //                    alert(`${row.name} saved!`)
            //                  });
            //                }
            //        }


        },
        actions: false
    };

    createNew() {
        this.router.navigate( ['admin-workshop-new/'] );
    }

    isShowActive() {
        return this.activeWorkshopView;
    }

    showDeletedWorkshops() {
        this.loadDeletedWorkshops();

        this.activeWorkshopView = false;
    }

    showActiveWorkshops() {
        this.loadWorkshops();

        this.activeWorkshopView = true;
    }

}
