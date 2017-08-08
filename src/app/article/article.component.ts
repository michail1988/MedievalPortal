import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from "app/models/article";
import { Comment } from "app/models/comment";
import { CommentService } from "app/services/comment.service";

@Component( {
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
} )

//Nawigacja: https://github.com/gothinkster/angular-realworld-example-app/blob/master/src/app/editor/editor.component.ts
//Layout: https://startbootstrap.com/template-overviews/blog-post/
export class ArticleComponent implements OnInit {

    article: Article;
    comments: Comment[];

    comment = new Comment( '', null, '', '', '', '', null, '', '', '' );

    constructor( private route: ActivatedRoute,
        private router: Router,
        private commentService: CommentService ) { }

    ngOnInit() {
        this.route.data.subscribe(
            ( data: { article: Article } ) => {
                if ( data.article ) {
                    this.article = data.article;
                } else {
                    //TODO Michal error and redirect
                }
            }
        );

        if ( this.article.id ) {
            //TODO w zaleznosci od uzytkownika
            this.loadAllComments();
        }


    }

    loadAllComments() {
        this.commentService.getAllComments( this.article.id )
            .subscribe(
            c => this.comments = c, //Bind to view
            err => {
                // Log errors if any
                console.log( err );
            } );
    }

    loadConfirmedComments() {
        this.commentService.getConfirmedComments( this.article.id )
            .subscribe(
            c => this.comments = c, //Bind to view
            err => {
                // Log errors if any
                console.log( err );
            } );
    }

    addNewComment() {
        //todo get from localStorage.getItem( 'token' )

        //rozroznienie na tworzenie parent comment i comment

        this.comment.fk_user = '1';
        this.comment.fk_post = this.article.id;

        //todo if uprawnienia

        //todo admin user ma od razu zatwierdzony post

        this.commentService.addParentCommentAdminUser( this.comment ).subscribe(
                c => this.comments = c

            //todo dymek?

            ,
            err => {
                // Log errors if any
                console.log( err );
            } );
        
        this.comment = new Comment( '', null, '', '', '', '', null, '', '', '' );
    }

}
