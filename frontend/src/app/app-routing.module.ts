import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenComponent } from './open/open.component';
import { SecureComponent } from './secure/secure.component';
import { AdminComponent } from './admin/admin.component';
import { CreateReviewComponent } from './create-review/create-review.component';
import { CreateSongComponent } from './create-song/create-song.component';
import { DmcaTakeDownPolicyComponent } from './dmca-take-down-policy/dmca-take-down-policy.component';
import { SecurityPrivacyPolicyComponent } from './security-privacy-policy/security-privacy-policy.component';
import { LogComponent } from './log/log.component';
import { BrowseSongsComponent } from './browse-songs/browse-songs.component';

import {SecurityGuard} from './security.guard'
import {AdminGuard} from './admin.guard'

const routes: Routes = [
	{ path: '', component: OpenComponent },
  { path: 'secure', component: SecureComponent, canActivate: [SecurityGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'secure/createReview', component: CreateReviewComponent, canActivate: [SecurityGuard] },
  { path: 'secure/createSong', component: CreateSongComponent, canActivate: [SecurityGuard] },
  { path: 'policy/dmcaTakeDown', component: DmcaTakeDownPolicyComponent },
  { path: 'policy/securityPrivacy', component: SecurityPrivacyPolicyComponent },
  { path: 'log', component: LogComponent, canActivate: [AdminGuard] },
  { path: 'songs', component: BrowseSongsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
