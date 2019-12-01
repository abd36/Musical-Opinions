import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Song } from "./song";

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	constructor(private http: HttpClient) { }

	getTopTenSongs() {
		return this.http.get<any>('/api/open/song/top');
	}

	getMostRecentReview(id: string) {
		return this.http.get<any>(`/api/open/review/most-recent/song/${id}`);
	}

	getAllReviews(id: string) {
		return this.http.get<any>(`/api/open/review/song/${id}`);
	}
}