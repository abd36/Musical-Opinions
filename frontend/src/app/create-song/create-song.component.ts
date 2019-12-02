import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { SecureService } from '../secure.service';
import { SecurityService } from '../security.service';

import { User } from "../user";
import { Song } from "../song";
import { reject } from 'q';
import { resolve } from 'url';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.css']
})
export class CreateSongComponent implements OnInit {
  song = new Song("", "", "", "", "", "", 0, 0, 0, 0, false, false);

  constructor(
    private router: Router,
    private location: Location,
    private secureService: SecureService,
    private securityService: SecurityService
    ) { }

  ngOnInit() {}

  submit() : Promise<any> {
    return new Promise((resolve, reject) => {
      this.secureService.createSong(this.song).subscribe(data => {
        if (data.error) { console.log(data.error); reject(); }
        else { this.song = data; resolve(); }
        console.log(this.song);
      });
    })
  }

  saveSong() {
    this.submit();
    this.cancel();
  }

  withReview() {
    this.submit().then(res => this.router.navigate(["secure/createReview"], { state: { data: this.song } }));
  }

  cancel() { this.location.back(); }

}
