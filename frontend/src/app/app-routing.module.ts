import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenComponent } from './open/open.component';
import { SecureComponent } from './secure/secure.component';

import {SecurityGuard} from './security.guard'

const routes: Routes = [
	{ path: '', component: OpenComponent},
	{ path: 'secure', component: SecureComponent, canActivate: [SecurityGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
