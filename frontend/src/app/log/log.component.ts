import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from "@angular/router";

import { Log } from "../log";
import { Song } from "../song";

import { SecureService } from "../secure.service";

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  log = new Log("", "", "");
  logs: Object;
  types = ["request", "notice", "dispute"];
  songs: Object;
  songNames = new Map<string, string>();

  constructor(
    private router: Router,
    private secureService: SecureService,
    private location: Location
    ) { }

  ngOnInit() {
    this.getAllSongs().then(res => this.getAllLogs());
  }

  getAllLogs() {
    this.secureService.getAllLogs().subscribe(data => {
      if (!data.error) this.logs = data;
      else console.log(data.error);
    });
  }

  getSongName(id: string) {
    return this.songNames.get(id);
  }

  createLog() {
    this.secureService.postLog(this.log).subscribe(data => {
        if(!data.error) this.getAllLogs();
        else console.log("fail add log" + data.error);
    });
  }

  getAllSongs() : Promise<any> {
    return new Promise((resolve, reject) => {
      this.secureService.getAllSongs().subscribe(data => {
        if (!data.error) {
          for (let song of data) {
            this.songNames.set(song._id, song.title);
          }
          this.songs = data;
          return resolve();
        }
        else {
          if (data.error.includes("authentication")) {
            this.router.navigate([""], { state: { data: data.error } });
          }
          return reject();
        }
      });
    });
  }

  return() { this.location.back(); }
}
