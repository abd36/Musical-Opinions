import { Component, OnInit, Input } from '@angular/core';

import { OpenService } from '../open.service';

import { Song } from "../song";
import { Review } from "../review";

@Component({
  selector: 'app-song-info',
  templateUrl: './song-info.component.html',
  styleUrls: ['./song-info.component.css']
})
export class SongInfoComponent implements OnInit {
	@Input() song: Song;

	mostRecentReview = new Review(0, '', '', '');
	allReviews : object;

  constructor(private openService: OpenService) { }

  ngOnInit() {
  	this.openService.getMostRecentReview(this.song._id).subscribe(data => { this.mostRecentReview = data; });
  }

  getAllReviews(id: string) {
  	this.openService.getAllReviews(id).subscribe(data => { this.allReviews = data; });
  }

}
