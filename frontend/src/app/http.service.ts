import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Song } from "./song";
import { User } from "./user";
import { Review } from "./review";

@Injectable({
	providedIn: 'root'
})
export class HttpService {//TODO: group model methods together
	constructor(private http: HttpClient) { }
	
	getTopTenSongs() { return this.http.get<any>('/api/open/song/top'); }
	
	getMostRecentReview(id: string) { return this.http.get<any>(`/api/open/review/most-recent/song/${id}`); }
	
	getAllReviews(id: string) { return this.http.get<any>(`/api/open/review/song/${id}`); }
	
	putLogin(user: User) {
		//TODO: remove these
		// const options = {responseType: 'text' as 'json'};
		// return this.http.post<any>('/open/user/login', user, options);
		return this.http.put<any>('/api/open/user/login', user);
	}
	
	postCreateUser(user: User) { return this.http.post<any>('/api/open/user/create', user); }
	
	getAllSongs(){ return this.http.get<any>('/api/secure/song/all'); }

	postReview(review: Review) { return this.http.post<any>('api/secure/review/create', review); }

	postSong(song: Song) { return this.http.post<any>('api/secure/song/create', song); }

	getAllUsers() { return this.http.get<any>('/api/secure/user/all'); }

	postToggleAdmin(id: string) { return this.http.post<any>(`/api/secure/user/admin/${id}`, {}); }
	
	postToggleActive(id: string) { return this.http.post<any>(`/api/secure/user/active/${id}`, {}); }
}