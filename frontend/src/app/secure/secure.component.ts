import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { OpenService } from '../open.service';
import { SecureService } from '../secure.service';

@Component({
  selector: "app-secure",
  templateUrl: "./secure.component.html",
  styleUrls: ["./secure.component.css"]
})
export class SecureComponent implements OnInit {
  songs: object;
  change: boolean = true;

  constructor(
    private location: Location,
    private openService: OpenService,
    private secureService: SecureService,
    private router: Router
    ) {}

  ngOnInit() { this.openService.getTopTenSongs().subscribe(data => { this.songs = data; }); }

  createReview() { this.router.navigate(["secure/createReview"]); this.change = !this.change; }

  createSong() { this.router.navigate(["secure/createSong"]); this.change = !this.change; }

  logout() { this.router.navigate([""]); }
}
