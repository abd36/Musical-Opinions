import { Injectable } from '@angular/core';

import {HttpService} from "./http.service"

import { Song } from "./song";
import { Review } from "./review";
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class SecureService {

  constructor(private http : HttpService) { }

  getAllSongs() { return this.http.getAllSongs(); }

  createReview(review: Review) { return this.http.postReview(review); }

  createSong(song: Song) { return this.http.postSong(song); }

}
