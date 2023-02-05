import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { Directive, forwardRef } from '@angular/core';
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
}
