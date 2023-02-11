import { Component, Input } from '@angular/core';
import { HeroMessage } from '../model/hero-message';

const expand = (char: number) => {
  const min = 65;
  const max = 90;
  const range = max - min;
  const pos = char - min;

  return Math.round(255 * (pos / range));
};

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

  get color() {
    const c = this.message.name.toUpperCase();
    return `rgb(${expand(c.charCodeAt(0))}, ${expand(
      c.charCodeAt(1),
    )}, ${expand(c.charCodeAt(2))})`;
  }
}
