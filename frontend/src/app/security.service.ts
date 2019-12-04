import { Injectable } from '@angular/core';
import * as jwtDecode from "jwt-decode";

import { SecureService } from './secure.service';

import { User } from './user';

@Injectable({
	providedIn: 'root'
})
export class SecurityService {
	flag: boolean;

	constructor(private secureService: SecureService) { }

	loggedIn() : boolean {
		this.checkUsers().then(res => { this.flag = true; }).catch(res => { this.flag = false; });
		return this.flag;
	}

	checkUsers() : Promise<any> {
		return new Promise((resolve, reject) => {
			this.secureService.getAllUsers().subscribe(data => {
				for (let user of data) {
					console.log(data);
					if (this.decodeToken()._id == user._id) {
						return resolve();
					}
				}
				return reject();
			})
		})
	}

	getToken() { return localStorage.getItem('token'); }

	decodeToken() : User { return jwtDecode(localStorage.getItem("token")); }

	checkAdmin() { return this.decodeToken().isAdmin; }
}
