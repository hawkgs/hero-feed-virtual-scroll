import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { HeroMessageComponent } from './hero-message/hero-message.component';
import { ApiService } from './api/api.service';
import { HeroMessagesService } from './hero-messages.service';
import { HeroMessageVirtualScrollDirective } from './virtual-scroll/hero-message-virtual-scroll.directive';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroMessageComponent,
    HeroMessageVirtualScrollDirective,
    InfiniteScrollComponent,
  ],
  imports: [BrowserModule, ScrollingModule],
  providers: [ApiService, HeroMessagesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
