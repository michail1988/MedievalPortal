import { Injectable, Sanitizer } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

//Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ImageService {

    private imageUrl = 'http://localhost:3000/profileimage';

    constructor( private http: Http, private sanitizer: DomSanitizer ) { }

    getUserImage(id) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl + "?id=" + id)
    }
}
