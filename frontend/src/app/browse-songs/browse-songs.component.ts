import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { OpenService } from '../open.service';

@Component({
  selector: 'app-browse-songs',
  templateUrl: './browse-songs.component.html',
  styleUrls: ['./browse-songs.component.css']
})
export class BrowseSongsComponent implements OnInit {
  query: string;
  songs: Object;

  constructor(private location: Location, private openService: OpenService) { }

  ngOnInit() {
  }

  search() {
    if (this.query != "") {
      this.openService.search(this.query).subscribe(data => {
        if (!data.error) this.songs = data;
        else console.log(data.error);
      });
    }
    else this.songs = null;
  }

  return() { this.location.back(); }

}
