import { Component, OnInit, Input } from '@angular/core';

import { OpenService } from '../open.service';

@Component({
  selector: 'app-top-songs',
  templateUrl: './top-songs.component.html',
  styleUrls: ['./top-songs.component.css']
})
export class TopSongsComponent implements OnInit {
  @Input() songs: object;

  constructor(private openService: OpenService) { }

  ngOnInit() {
    this.openService.getTopTenSongs().subscribe(data => { this.songs = data; });
  }

}
