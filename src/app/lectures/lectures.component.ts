import { Component, OnInit } from '@angular/core';
import { LectureService } from "app/services/lecture.service";
import { Lecture } from "app/models/lecture";

@Component( {
    selector: 'lectures',
    templateUrl: './lectures.component.html',
    styleUrls: ['./lectures.component.css']
} )
export class LecturesComponent implements OnInit {

    lectures: Lecture[];
    constructor( private lectureService: LectureService ) { }

    ngOnInit() {
        this.loadLectures()

        window.scrollTo( 0, 0 )
    }

    loadLectures() {
        this.lectureService.getLectures()
            .subscribe(
            lectures => this.lectures = lectures, //Bind to view
            err => {
                // Log errors if any
                console.log( err );
            } );
    }

}
