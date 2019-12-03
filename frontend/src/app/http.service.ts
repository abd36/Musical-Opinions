import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Song } from "./song";
import { User } from "./user";
import { Review } from "./review";
import { DmcaTakeDownPolicy } from './dmca-take-down-policy';
import { SecurityPrivacyPolicy } from './security-privacy-policy';
import { Log } from "./log";

@Injectable({
	providedIn: 'root'
})
export class HttpService {//TODO: group model methods together
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
	
	getAllSongs() {
		return this.http.get<any>('/api/secure/song/all');
	}

	getAllSongsButHidden() {
		return this.http.get<any>('/api/secure/song/allButHidden');
	}

	postReview(review: Review) {
		return this.http.post<any>('api/secure/review/create', review);
	}

	postSong(song: Song) {
		return this.http.post<any>('api/secure/song/create', song);
	}

	getAllUsers() {
		return this.http.get<any>('/api/secure/user/all');
	}

	postToggleAdmin(id: string) {
		return this.http.post<any>(`/api/secure/user/admin/${id}`, {});
	}
	
	postToggleActive(id: string) {
		return this.http.post<any>(`/api/secure/user/active/${id}`, {});
	}

	postToggleCopyright(id: string) {
		return this.http.post<any>(`/api/secure/song/copyright/${id}`, {});
	}

	postToggleHidden(id: string) {
		return this.http.post<any>(`/api/secure/song/hidden/${id}`, {});
	}

	postDmcaTakeDown(policy: DmcaTakeDownPolicy) {
		return this.http.post<any>('/api/secure/dmcaTakeDown/create', policy);
	}

	getDmcaTakeDown() {
		return this.http.get<any>('/api/secure/dmcaTakeDown');
	}

	postDmcaTakeDownUpdate(policy: DmcaTakeDownPolicy) {
		return this.http.post<any>(`/api/secure/dmcaTakeDown/update/${policy._id}`, policy);
	}

	postSecurityPrivacy(policy: SecurityPrivacyPolicy) {
		return this.http.post<any>('/api/secure/securityPrivacy/create', policy);
	}

	getSecurityPrivacy() {
		return this.http.get<any>('/api/secure/securityPrivacy');
	}

	postSecurityPrivacyUpdate(policy: SecurityPrivacyPolicy) {
		return this.http.post<any>(`/api/secure/securityPrivacy/update/${policy._id}`, policy);
	}

	getAllLogs() {
		return this.http.get<any>('/api/secure/log');
	}

	postLog(log: Log) {
		return this.http.post<any>('/api/secure/log/create', log);
	}
}