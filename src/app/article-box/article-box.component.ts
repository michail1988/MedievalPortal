import { Component, Input, OnInit } from '@angular/core';
import { Article } from "app/models/article";

@Component( {
    selector: 'article-box',
    templateUrl: './article-box.component.html',
    styleUrls: ['./article-box.component.css']
} )
export class ArticleBoxComponent implements OnInit {

    @Input() article: Article;
    constructor() { }

    ngOnInit() {
    }

}
