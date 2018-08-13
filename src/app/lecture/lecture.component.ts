import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Lecture } from "app/models/lecture";

@Component( {
    selector: 'lecture',
    templateUrl: './lecture.component.html',
    styleUrls: ['./lecture.component.css']
} )
export class LectureComponent implements OnInit {

    @Input() lecture: Lecture;
    constructor( private route: ActivatedRoute,
        private router: Router ) { }

    ngOnInit() {

        window.scrollTo( 0, 0 )

    }

}
