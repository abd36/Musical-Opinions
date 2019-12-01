import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpenComponent } from './open/open.component';
import { SecureComponent } from './secure/secure.component';
import { FormsModule } from '@angular/forms';
import { SongInfoComponent } from './song-info/song-info.component';

@NgModule({
  declarations: [
    AppComponent,
    OpenComponent,
    SecureComponent,
    SongInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
