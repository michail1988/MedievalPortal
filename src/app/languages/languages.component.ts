import { Component, OnInit } from '@angular/core';
import { TranslateService } from "app/translations/translate.service";
import { Config } from "app/utils/config";

@Component( {
    selector: 'languages',
    templateUrl: './languages.component.html',
    styleUrls: ['./languages.component.css']
} )

//https://scotch.io/tutorials/simple-language-translation-in-angular-2-part-1
export class LanguagesComponent implements OnInit {

    public supportedLanguages: any[];

    constructor( private _translate: TranslateService ) { }

    ngOnInit() {
        // standing data
        this.supportedLanguages = [
            { display: 'Polski', value: 'pl', flag: 'pl' },
            { display: 'English', value: 'en', flag: 'gb' },
            { display: 'Deutsch', value: 'de', flag: 'de' }
        ];

        // set current langage
        this.selectLang( 'pl' );
    }

    isCurrentLang( lang: string ) {
        // check if the selected lang is current lang
        return lang === this._translate.currentLang;
    }

    selectLang( lang: string ) {
        // set current lang;
        this._translate.use( lang );
    }
    
    isShowLangs() {
        return Config.isShowLangs();
    }

}
