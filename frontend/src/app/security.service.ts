import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SecurityService {

	constructor() { }

	loggedIn(){
		return !!localStorage.getItem('token') 
		// TODO: add some jwt authentication here, this is only checking if there is a token not if it is valid as well
	}

	getToken(){
		return localStorage.getItem('token')
	}
}
