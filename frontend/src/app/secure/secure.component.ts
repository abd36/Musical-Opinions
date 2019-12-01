import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

import { SongInfoComponent } from '../song-info/song-info.component';

import { OpenService } from '../open.service';
import { SecureService } from '../secure.service';

@Component({
  selector: "app-secure",
  templateUrl: "./secure.component.html",
  styleUrls: ["./secure.component.css"]
})
export class SecureComponent implements OnInit {
  songs: object;

  constructor(private openService: OpenService, private secureService: SecureService, private router: Router) {}

  ngOnInit() {
    this.openService.getTopTenSongs().subscribe(data => { this.songs = data; });
  }

  logout() { this.router.navigate([""]); }
}
