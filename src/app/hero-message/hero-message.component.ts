import { Component, Input } from '@angular/core';
import { HeroMessage } from '../model/hero-message';

@Component({
  selector: 'app-hero-message',
  templateUrl: './hero-message.component.html',
  styleUrls: ['./hero-message.component.scss'],
})
export class HeroMessageComponent {
  @Input() message!: HeroMessage;

  get initials() {
    return this.message.name
      .split(' ')
      .map((name: string) => name[0])
      .join('');
  }
}
