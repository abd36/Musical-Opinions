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
  reviewsFlag: boolean = false;
  allReviews : object;
  allReviewsFlag: boolean = false;

  constructor(private openService: OpenService) { }

  ngOnInit() {
    this.getMostRecentReview(this.song._id);
    this.getAllReviews(this.song._id);
  }

  getMostRecentReview(id: string) {
    this.openService.getMostRecentReview(this.song._id).subscribe(data => {
      if (data != null) {
        this.reviewsFlag = true;
        this.mostRecentReview = data;
      }
    });
  }

  getAllReviews(id: string) { this.openService.getAllReviews(id).subscribe(data => { this.allReviews = data; }); }

  enableAllReviews() { this.allReviewsFlag = !this.allReviewsFlag; }

}
