import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from "app/models/news";
import { Comment } from "app/models/comment";
import { CommentNewsService } from "app/services/comment-news.service";

@Component( {
    selector: 'news-single',
    templateUrl: './news-single.component.html',
    styleUrls: ['./news-single.component.css']
} )
export class NewsSingleComponent implements OnInit {

    article: News;
    comments: Comment[];

    comment = new Comment( '', null, '', '', '', '', null, '', '', '' );

    userid: string;
    
    constructor( private route: ActivatedRoute,
        private router: Router,
        private commentService: CommentNewsService ) { }

    ngOnInit() {
        this.route.data.subscribe(
            ( data: { news: News } ) => {
                if ( data.news ) {
                    this.article = data.news;
                } else {
                    //TODO Michal error and redirect
                }
            }
        );

        if ( this.article.id ) {
            //TODO w zaleznosci od uzytkownika
            this.loadAllComments();
        }


        window.scrollTo( 0, 0 )
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

        this.comment.fk_user = this.userid;
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
    
    isLogged() {
        this.userid = localStorage.getItem( 'userid' );
        return ( this.userid );
    }

}
