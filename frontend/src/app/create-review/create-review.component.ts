import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { SecureService } from '../secure.service';
import { SecurityService } from '../security.service';

import { Review } from "../review";
import { User } from "../user";

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {
  songs: Object;
  review = new Review(5, "", "", "");
  user: User;
  selectedSongId: string;

  constructor(
    private router: Router,
    private location: Location,
    private secureService: SecureService,
    private securityService: SecurityService
    ) { }

  ngOnInit() { 
    this.getAllSongs();
    this.user = this.securityService.decodeToken();
    if (history.state.data) {
      this.selectedSongId = history.state.data._id;
      this.review.songId = history.state.data._id;
    }
  }

  submit() {
    this.review.userEmail = this.user.email;
    this.secureService.createReview(this.review).subscribe(data => {
      if (!data.error) {
        this.cancel();
      } else {
        console.log(data.error);
      }
    });
  }

  getAllSongs(){
    this.secureService.getAllButHiddenSongs().subscribe(data => {
      this.songs = data;
    })
  }

  cancel() { this.router.navigate(["secure"]); }
}
