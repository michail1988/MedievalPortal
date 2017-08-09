import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { EventService } from "app/services/event.service";
import { Event } from "app/models/event";


@Injectable()
export class EventResolver implements Resolve<Event> {
  constructor(
    private eventService: EventService,
    private router: Router,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Event> {

      
    return this.eventService.getEvent(route.params['id'])
           .catch((err) => this.router.navigateByUrl('/'));

  }
}