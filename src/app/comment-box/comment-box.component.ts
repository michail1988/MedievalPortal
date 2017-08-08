import { Component, Input, OnInit } from '@angular/core';
import { Comment } from "app/models/comment";

@Component({
  selector: 'comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {

    @Input() comment: Comment;
    constructor() { }

    ngOnInit() {
    }

}
