import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from "ng2-smart-table/ng2-smart-table";
import { Lecture } from "app/models/lecture";
import { LectureService } from "app/services/lecture.service";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";


@Component( {
    selector: 'admin-lectures',
    templateUrl: './admin-lectures.component.html',
    styleUrls: ['./admin-lectures.component.css']
} )
export class AdminLecturesComponent implements OnInit {

    lectures: Lecture[];
    source: LocalDataSource;
    activeLectureView: boolean;

    constructor( private lectureService: LectureService, private router: Router ) {
        this.source = new LocalDataSource();

        this.lectureService.getLectures().toPromise().then(( data ) => {
            this.source.load( data );
        } );

        this.activeLectureView = true;
    }

    ngOnInit() {
        window.scrollTo( 0, 0 )
    }

    loadLectures() {
        this.lectureService.getLectures().toPromise().then(( data ) => {
            this.source.load( data );
        } );
    }

    loadDeletedLectures() {
        this.lectureService.getDeletedLectures().toPromise().then(( data ) => {
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
                    return '<a href="/admin-lecture/' + row.id + '">Edytuj</a>'
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
        this.router.navigate( ['admin-lecture-new/'] );
    }

    isShowActive() {
        return this.activeLectureView;
    }

    showDeletedLectures() {
        this.loadDeletedLectures();

        this.activeLectureView = false;
    }

    showActiveLectures() {
        this.loadLectures();

        this.activeLectureView = true;
    }

}
