import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Lecture } from "app/models/lecture";
import { LectureService } from "app/services/lecture.service";


@Injectable()
export class LectureResolver implements Resolve<Lecture> {
    constructor(
            private lectureService: LectureService,
            private router: Router,
          ) {}

          resolve(
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
          ): Observable<Lecture> {

              
            return this.lectureService.getLecture(route.params['id'])
                   .catch((err) => this.router.navigateByUrl('/'));

          }
        }