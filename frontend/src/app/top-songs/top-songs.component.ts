import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { OpenService } from '../open.service';

@Component({
  selector: 'app-top-songs',
  templateUrl: './top-songs.component.html',
  styleUrls: ['./top-songs.component.css']
})
export class TopSongsComponent implements OnChanges {
  @Input() change: boolean;

  songs: object;

  constructor(private openService: OpenService) { }

  ngOnChanges() {
    this.openService.getTopTenSongs().subscribe(data => { this.songs = data; });
  }

}
