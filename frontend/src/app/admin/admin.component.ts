import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SecureService } from '../secure.service';

import { User } from "../user";
import { Song } from "../song";
import { DmcaTakeDownPolicy } from "../dmca-take-down-policy";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: Object;
  user = new User("", "", "", false, true);
  songs: Object;
  song = new Song("", "", "", "", "", "", 0, 0, 0, 0, 0, false, false);
  error: string = "";
  DMCATDFlag: boolean = false;
  DMCATDCreateFlag: boolean = false;
  DMCATDUpdateFlag: boolean = false;
  dmcaTakeDown = new DmcaTakeDownPolicy("", "", "");
  DMCATDResult: string = "";

  constructor(private router: Router, private secureService: SecureService) { }

  ngOnInit() {
    this.populateUsers();
    this.populateSongs();
  }

  createOrUpdateDMCATD() {
    if (this.DMCATDCreateFlag) this.createDMCATD();
    else this.updateDMCATD();
  }

  createDMCATD() {
    this.secureService.createDmcaTakeDownPolicy(this.dmcaTakeDown).subscribe(data => {
      console.log(data);
      if (!data.error) {
        this.DMCATDFlag = false;
        this.DMCATDResult = "created a new dmca and takedown policy";
      } else {
        this.DMCATDResult = data.error._message;
      }
    });
  }

  updateDMCATD() {
    
  }

  createToggleDMCATD() {
    this.DMCATDFlag = true;
    this.DMCATDCreateFlag = true;
    this.DMCATDUpdateFlag = false;
  }

  updateToggleDMCATD() {
    this.DMCATDFlag = true;
    this.DMCATDUpdateFlag = true;
    this.DMCATDCreateFlag = false;
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

  toggleHidden() {
    if (this.song._id != "") {
      this.secureService.toggleHidden(this.song._id).subscribe(data => {
        if (!data.error) {
          this.populateSongs();
        }
        else this.error = data.error;
      });
    }
  }

  populateUsers() {
    this.secureService.getAllUsers().subscribe(data => {
      if (!data.error) this.users = data;
      else this.error = data.error;
    });
  }

  populateSongs() {
    this.secureService.getAllSongs().subscribe(data => {
      if (!data.error) this.songs = data;
      else this.error = data.error;
    });
  }

  logout() { this.router.navigate([""]); }
}
