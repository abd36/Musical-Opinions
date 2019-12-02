import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OpenService } from '../open.service';
import { SecurityService } from '../security.service';

import { User } from "../user";

@Component({
	selector: 'app-open',
	templateUrl: './open.component.html',
	styleUrls: ['./open.component.css']
})

export class OpenComponent implements OnInit {
	error: string;
	change: boolean = true;
	userModel = new User("", "mine@mine.com", "test", false, true); //TODO: remove the email and hello, replace with empty string when not dev
	newUserModel = new User("", "", "", false, true);
	
	constructor(private securityService: SecurityService, private openService: OpenService, private router: Router) { }
	
	ngOnInit() {}
	
	login() {
		this.openService.login(this.userModel).subscribe(data => {
			if (!data.error) {
				localStorage.setItem("token", data.token);
				if(this.securityService.decodeToken().isAdmin){
					this.router.navigate(["admin"]);
				}
				else {
					this.router.navigate(["secure"]);
				}
			}
			else {
				this.error = data.error;
			}
		},
		error => console.log("error: " + error)
		);
	}

	createUser() {
		this.openService.createUser(this.newUserModel).subscribe(data => {
			if (!data.error) {
				localStorage.setItem("token", data.token);
				this.router.navigate(["secure"]);
			}
			else {
				this.error = data.error;
			}
		});
	}
}