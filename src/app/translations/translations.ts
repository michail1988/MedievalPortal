import { OpaqueToken } from '@angular/core';

//import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_DE_NAME, LANG_DE_TRANS } from './lang-de'
import { LANG_PL_NAME, LANG_PL_TRANS } from './lang-pl'

//translation token
export const TRANSLATIONS = new OpaqueToken( 'translations' );

// Fix: Error encountered resolving symbol values statically
//https://github.com/angular/angular/issues/13983
//

//all translations
export const dictionary = {
        'en': LANG_EN_TRANS,
        'de': LANG_DE_TRANS,
        'pl': LANG_PL_TRANS,
}

//providers
export const TRANSLATION_PROVIDERS = [
    {
        provide: TRANSLATIONS, useValue: dictionary

    },];