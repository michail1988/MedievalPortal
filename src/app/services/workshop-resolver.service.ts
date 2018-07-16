import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Workshop } from "app/models/workshop";
import { WorkshopService } from "app/services/workshop.service";

@Injectable()
export class WorkshopResolver implements Resolve<Workshop> {
    constructor(
            private workshopService: WorkshopService,
            private router: Router,
          ) {}

          resolve(
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
          ): Observable<Workshop> {

              
            return this.workshopService.getWorkshop(route.params['id'])
                   .catch((err) => this.router.navigateByUrl('/'));

          }
        }