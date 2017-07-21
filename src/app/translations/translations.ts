import { OpaqueToken } from '@angular/core';

//import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_DE_NAME, LANG_DE_TRANS } from './lang-de'
import { LANG_PL_NAME, LANG_PL_TRANS } from './lang-pl'

//translation token
export const TRANSLATIONS = new OpaqueToken( 'translations' );

//all translations
export const dictionary = {
    [LANG_EN_NAME]: LANG_EN_TRANS,
    [LANG_DE_NAME]: LANG_DE_TRANS,
    [LANG_PL_NAME]: LANG_PL_TRANS,
}

//providers
export const TRANSLATION_PROVIDERS = [
    {
        provide: TRANSLATIONS, useValue: dictionary

    },];