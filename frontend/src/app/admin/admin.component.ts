import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SecureService } from '../secure.service';

import { User } from "../user";
import { Song } from "../song";
import { DmcaTakeDownPolicy } from "../dmca-take-down-policy";
import { SecurityPrivacyPolicy } from "../security-privacy-policy";

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

  securityPrivacyFlag: boolean = false;
  securityPrivacyCreateFlag: boolean = false;
  securityPrivacyUpdateFlag: boolean = false;
  securityPrivacy = new SecurityPrivacyPolicy("", "", "");
  securityPrivacyResult: string = "";

  constructor(private router: Router, private secureService: SecureService) { }

  ngOnInit() {
    this.populateUsers();
    this.populateSongs();
  }

  createOrUpdateSecurityPrivacy() {
    if (this.securityPrivacyCreateFlag) this.createSecurityPrivacy();
    else this.updateSecurityPrivacy();
  }

  createSecurityPrivacy() {
    this.secureService.createSecurityPrivacyPolicy(this.securityPrivacy).subscribe(data => {
      if (!data.error) {
        this.securityPrivacyFlag = false;
        this.securityPrivacyResult = "created a new security and privacy policy";
      } else {
        this.securityPrivacyResult = data.error._message;
      }
    });
  }

  updateSecurityPrivacy() {
    this.secureService.updateSecurityPrivacyPolicy(this.securityPrivacy).subscribe(data => {
      if (!data.error) {
        this.securityPrivacyFlag = false;
        this.securityPrivacyResult = "updated security and privacy policy";
      } else this.securityPrivacyResult = data.error._message;
    });
  }

  getSecurityPrivacy() {
    this.secureService.getSecurityPrivacyPolicy().subscribe(data => {
      if (!data.error) {
        this.securityPrivacy = data;
      } else this.securityPrivacyResult = data.error;
    });
  }

  createToggleSecurityPrivacy() {
    this.securityPrivacyFlag = true;
    this.securityPrivacyCreateFlag = true;
    this.securityPrivacyUpdateFlag = false;
    this.securityPrivacy._id = "";
    this.securityPrivacy.privacy = "";
    this.securityPrivacy.security = "";
    this.securityPrivacyResult = "";
  }

  updateToggleSecurityPrivacy() {
    this.securityPrivacyFlag = true;
    this.securityPrivacyUpdateFlag = true;
    this.securityPrivacyCreateFlag = false;
    this.getSecurityPrivacy();
    this.securityPrivacyResult = "";
  }

  createOrUpdateDMCATD() {
    if (this.DMCATDCreateFlag) this.createDMCATD();
    else this.updateDMCATD();
  }

  createDMCATD() {
    this.secureService.createDmcaTakeDownPolicy(this.dmcaTakeDown).subscribe(data => {
      if (!data.error) {
        this.DMCATDFlag = false;
        this.DMCATDResult = "created a new dmca and takedown policy";
      } else {
        this.DMCATDResult = data.error._message;
      }
    });
  }

  updateDMCATD() {
    this.secureService.updateDmcaTakeDownPolicy(this.dmcaTakeDown).subscribe(data => {
      if (!data.error) {
        this.DMCATDFlag = false;
        this.DMCATDResult = "updated dmca and takedown policy";
      } else this.DMCATDResult = data.error._message;
    });
  }

  getDMCATD() {
    this.secureService.getDmcaTakeDownPoliciy().subscribe(data => {
      if (!data.error) {
        this.dmcaTakeDown = data;
      } else this.DMCATDResult = data.error;
    });
  }

  createToggleDMCATD() {
    this.DMCATDFlag = true;
    this.DMCATDCreateFlag = true;
    this.DMCATDUpdateFlag = false;
    this.dmcaTakeDown._id = "";
    this.dmcaTakeDown.dmca = "";
    this.dmcaTakeDown.takeDown = "";
    this.DMCATDResult = "";
  }

  updateToggleDMCATD() {
    this.DMCATDFlag = true;
    this.DMCATDUpdateFlag = true;
    this.DMCATDCreateFlag = false;
    this.getDMCATD();
    this.DMCATDResult = "";
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
