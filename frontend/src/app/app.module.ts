import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpenComponent } from './open/open.component';
import { SecureComponent } from './secure/secure.component';
import { FormsModule } from '@angular/forms';
import { SongInfoComponent } from './song-info/song-info.component';
import { TokenInterceptorService } from './token-interceptor.service';
import {SecurityService} from './security.service'
import {SecurityGuard} from './security.guard'
import {HttpService} from './http.service';
import { TopSongsComponent } from './top-songs/top-songs.component';


@NgModule({
  declarations: [
    AppComponent,
    OpenComponent,
    SecureComponent,
    SongInfoComponent,
    TopSongsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SecurityGuard, SecurityService, HttpService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
