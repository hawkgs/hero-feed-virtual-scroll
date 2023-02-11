import { Component } from '@angular/core';
import { HeroMessagesService } from './hero-messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'hero-feed';

  constructor(public heroMsgs: HeroMessagesService) {
    this.heroMsgs.loadMessages();
  }
}
