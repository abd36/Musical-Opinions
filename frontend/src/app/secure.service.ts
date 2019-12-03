import { Injectable } from '@angular/core';

import { HttpService } from "./http.service"

import { Song } from "./song";
import { Review } from "./review";
import { User } from './user';
import { DmcaTakeDownPolicy } from './dmca-take-down-policy';
import { SecurityPrivacyPolicy } from './security-privacy-policy';
import { Log } from "./log";

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
  
  toggleCopyright(id: string) { return this.http.postToggleCopyright(id); }
  
  toggleHidden(id: string) { return this.http.postToggleHidden(id); }

  createDmcaTakeDownPolicy(policy: DmcaTakeDownPolicy) { return this.http.postDmcaTakeDown(policy); }

  getDmcaTakeDownPoliciy() { return this.http.getDmcaTakeDown(); }

  updateDmcaTakeDownPolicy(policy: DmcaTakeDownPolicy) { return this.http.postDmcaTakeDownUpdate(policy); }

  createSecurityPrivacyPolicy(policy: SecurityPrivacyPolicy) { return this.http.postSecurityPrivacy(policy); }

  getSecurityPrivacyPolicy() { return this.http.getSecurityPrivacy(); }

  updateSecurityPrivacyPolicy(policy: SecurityPrivacyPolicy) { return this.http.postSecurityPrivacyUpdate(policy); }

  getAllLogs() { return this.http.getAllLogs(); }

  postLog(log: Log) { return this.http.postLog(log); }
}
