import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserService } from "app/services/user.service";
import { User } from "app/models/user";

@Injectable()
export class UserResolver implements Resolve<User> {

    constructor(
        private userService: UserService,
        private router: Router,
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<User> {


        return this.userService.getUser( route.params['id'] )
            .catch(( err ) => this.router.navigateByUrl( '/' ) );

    }

}
