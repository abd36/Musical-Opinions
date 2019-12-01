import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Song } from "./song";
import { User } from "./user";

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
	
	putLogin(user: User) {
		//TODO: remove these
		// const options = {responseType: 'text' as 'json'};
		// return this.http.post<any>('/open/user/login', user, options);
		return this.http.put<any>('/api/open/user/login', user);
	}

	postCreateUser(user: User) {
		return this.http.post<any>('/api/open/user/create', user);
	}
}