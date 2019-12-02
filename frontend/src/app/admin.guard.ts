import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import {SecurityService} from './security.service'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private securityService: SecurityService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.securityService.checkAdmin()) {
      return true;
    }
    else {
      this.router.navigate(['']);
      return false
    }
  }
}
