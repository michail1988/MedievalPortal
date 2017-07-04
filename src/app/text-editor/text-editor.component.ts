import { Component, OnInit } from '@angular/core';

@Component( {
    selector: 'app-text-editor',
    templateUrl: './text-editor.component.html',
    styleUrls: ['./text-editor.component.css']
} )
export class TextEditorComponent implements OnInit {

    constructor() {

    }

    content = "<p> this is custom directive </p>";
    content_two = "<p> this is ng-ckeditor directive </p>";
    
    articleText = "To jest tresc.";
    
    get diagnostic() { return this.articleText; }
    
    ngOnInit(){
        window['CKEDITOR']['replace']( 'editor1' );
    }
        

}
