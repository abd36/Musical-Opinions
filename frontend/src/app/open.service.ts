import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";

import { Song } from "./song";

@Injectable({
  providedIn: 'root'
})
export class OpenService {

  constructor(private http: HttpService) { }

  getTopTenSongs() {
  	return this.http.getTopTenSongs();
  }

  getMostRecentReview(id: string) {
		return this.http.getMostRecentReview(id);
	}

	getAllReviews(id: string) {
		return this.http.getAllReviews(id);
	}
}