import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SongInfoComponent } from '../song-info/song-info.component';

import { OpenService } from '../open.service';

import { Song } from "../song";

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.css']
})

export class OpenComponent implements OnInit {
	songs: object;

  constructor(private openService: OpenService) { }

  ngOnInit() {
  	this.openService.getTopTenSongs().subscribe(data => { this.songs = data; });
  }
}
