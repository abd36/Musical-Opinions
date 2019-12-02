import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SecureService } from '../secure.service';

import { User } from "../user";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: Object;
  user = new User("", "", "", false, true);
  error: string = "";

  constructor(private router: Router, private secureService: SecureService) { }

  ngOnInit() {
    this.populateUsers();
  }

  toggleAdmin() {
    if (this.user.id != "") {
      this.secureService.toggleAdmin(this.user.id).subscribe(data => {
        if (!data.error) this.populateUsers();
        else this.error = data.error;
      });
    }
  }

  toggleActive() {
    if (this.user.id != "") {
      this.secureService.toggleActive(this.user.id).subscribe(data => {
        if (!data.error) this.populateUsers();
        else this.error = data.error;
      });
    }
  }

  populateUsers() {
    this.secureService.getAllUsers().subscribe(data => {
        this.users = data;
    });
  }

  logout() { this.router.navigate([""]); }
}
