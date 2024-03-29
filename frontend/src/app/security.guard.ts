import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import {SecurityService} from './security.service'

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {
  constructor(private securityService: SecurityService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.securityService.loggedIn()) return true;

    this.router.navigate(['']);
    return false;
  }
}
