import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenComponent } from './open/open.component';
import { SecureComponent } from './secure/secure.component';

const routes: Routes = [
	{ path: 'secure', component: SecureComponent, outlet: 'secure' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
