import { Component, OnInit } from '@angular/core';
import { Lecture } from "app/models/lecture";
import { LectureService } from "app/services/lecture.service";

@Component({
  selector: 'sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {

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
