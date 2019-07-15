import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { config } from 'src/config/pages-config';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private route: ActivatedRoute,
                private auth: AuthenticationService) {
    }
    /** The canActivate method returns a boolean indicating whether or not navigation to a route should be allowed  */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate([config.authentication.login.route]);
            return false;
        }
        return true;
    }


    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.canActivate(childRoute, state);
    }
}
