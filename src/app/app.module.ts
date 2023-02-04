import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { HeroMessageComponent } from './hero-message/hero-message.component';
import { ApiService } from './api/api.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroMessageComponent,
  ],
  imports: [
    BrowserModule,
    ScrollingModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
