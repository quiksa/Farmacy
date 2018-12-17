import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ActivateGuard implements CanActivate {

    constructor(private router: Router) {

    }

    canActivate() {
        //let data = true
        let data = sessionStorage.getItem('user');
        if (data) {
            return true;
        } else {
            this.router.navigate(['/login'])
        }
    }
}