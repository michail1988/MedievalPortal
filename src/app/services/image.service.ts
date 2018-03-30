import { Injectable, Sanitizer } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

//Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Config } from "app/utils/config";

@Injectable()
export class ImageService {

    private imageUrl = Config.serverAddress + '/profileimage';

    constructor( private http: Http, private sanitizer: DomSanitizer ) { }

    getUserImage(id) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl + "?id=" + id)
    }
}
