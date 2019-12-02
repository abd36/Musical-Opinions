import { Injectable } from '@angular/core';

import { HttpService } from "./http.service"

import { Song } from "./song";
import { Review } from "./review";
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class SecureService {

  constructor(private http : HttpService) { }

  getAllSongs() { return this.http.getAllSongs(); }

  getAllButHiddenSongs() { return this.http.getAllSongsButHidden(); }

  createReview(review: Review) { return this.http.postReview(review); }

  createSong(song: Song) { return this.http.postSong(song); }

  getAllUsers() { return this.http.getAllUsers(); }

  toggleAdmin(id: string) { return this.http.postToggleAdmin(id); }

  toggleActive(id: string) { return this.http.postToggleActive(id); }
  
  toggleHidden(id: string) { return this.http.postToggleHidden(id); }
}
