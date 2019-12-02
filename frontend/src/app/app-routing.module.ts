import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenComponent } from './open/open.component';
import { SecureComponent } from './secure/secure.component';
import { CreateReviewComponent } from './create-review/create-review.component';
import { CreateSongComponent } from './create-song/create-song.component';

import {SecurityGuard} from './security.guard'

const routes: Routes = [
	{ path: '', component: OpenComponent },
  { path: 'secure', component: SecureComponent, canActivate: [SecurityGuard] },
  { path: 'secure/createReview', component: CreateReviewComponent, canActivate: [SecurityGuard] },
  { path: 'secure/createSong', component: CreateSongComponent, canActivate: [SecurityGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
