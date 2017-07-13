import { TestBed, inject } from '@angular/core/testing';

import { TranslateService } from './translate.service';

describe( 'TranslateServiceService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule( {
            providers: [TranslateService]
        } );
    } );

    it( 'should be created', inject( [TranslateService], ( service: TranslateService ) => {
        expect( service ).toBeTruthy();
    } ) );
} );
