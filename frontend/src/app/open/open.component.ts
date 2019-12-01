import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OpenService } from '../open.service';

import { User } from "../user";

@Component({
	selector: 'app-open',
	templateUrl: './open.component.html',
	styleUrls: ['./open.component.css']
})

export class OpenComponent implements OnInit {
	error: string;
	
	userModel = new User("", "mine@mine.com", "test", false, true); //TODO: remove the email and hello, replace with empty string when not dev
	newUserModel = new User("", "", "", false, true);
	
	constructor(private openService: OpenService, private router: Router) { }
	
	ngOnInit() {}
	
	login() {
		this.openService.login(this.userModel).subscribe(data => {
			if (!data.error) {
				localStorage.setItem("token", data.token);
				this.router.navigate(["secure"]);
				// if(jwt_decode(data.token).isAdmin){
				// 	this.router.navigate(["auth/admin"]);
			}
			else {
				console.log(data.error);
				this.error = data.error;
			}
		},
		error => console.log("error: " + error)
		);
	}

	createUser() {
		this.openService.createUser(this.newUserModel).subscribe(data => {
			console.log(data);
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