import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ScheduleService } from "app/services/schedule.service";
import { Schedule } from "app/models/schedule";


@Injectable()
export class ScheduleResolver implements Resolve<Schedule> {
  constructor(
    private scheduleService: ScheduleService,
    private router: Router,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Schedule> {

      console.log('wywolano schedule resolver')
    return this.scheduleService.getSchedule(route.params['id'])
           .catch((err) => this.router.navigateByUrl('/'));

  }
}
