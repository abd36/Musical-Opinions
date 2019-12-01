import { Injectable } from '@angular/core';
import {HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http'

import {SecurityService} from './security.service'

@Injectable({
	providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

	constructor(private securityService: SecurityService) { }

	intercept(req, next){
		let tokenReq = req.clone({
			setHeaders: {
				Authorization: `Bearer ${this.securityService.getToken()}`,
			}
		})
		return next.handle(tokenReq);
	}
}
