import { Component, Input, OnInit } from '@angular/core';
import { News } from "app/models/news";

@Component( {
    selector: 'news-box',
    templateUrl: './news-box.component.html',
    styleUrls: ['./news-box.component.css']
} )
export class NewsBoxComponent implements OnInit {

    @Input() article: News;
    constructor() { }

    ngOnInit() {
    }

}