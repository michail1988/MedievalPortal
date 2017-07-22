import { Component, OnInit, Input } from '@angular/core';
import { ArticleHistory } from "app/models/article-history";

@Component( {
    selector: 'admin-article-history',
    templateUrl: './admin-article-history.component.html',
    styleUrls: ['./admin-article-history.component.css']
} )
export class AdminArticleHistoryComponent implements OnInit {

    @Input() articlesHistory: ArticleHistory[];

    constructor() { }

    ngOnInit() {
    }

}
