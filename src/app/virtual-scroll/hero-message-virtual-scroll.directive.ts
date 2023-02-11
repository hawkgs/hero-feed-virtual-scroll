import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { Directive, forwardRef, Input } from '@angular/core';
import { HeroMessage } from '../model/hero-message';
import { HeroMessageVirtualScrollStrategy } from './hero-message-virtual-scroll';

@Directive({
  selector: '[appHeroMessageVirtualScroll]',
  providers: [
    {
      provide: VIRTUAL_SCROLL_STRATEGY,
      useFactory: (d: HeroMessageVirtualScrollDirective) => d._scrollStrategy,
      deps: [forwardRef(() => HeroMessageVirtualScrollDirective)],
    },
  ],
})
export class HeroMessageVirtualScrollDirective {
  _scrollStrategy = new HeroMessageVirtualScrollStrategy();

  private _messages: HeroMessage[] = [];

  @Input()
  set messages(value: HeroMessage[] | null) {
    if (value && this._messages.length !== value.length) {
      this._scrollStrategy.updateMessages(value);
      this._messages = value;
    }
  }
}
