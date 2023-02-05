import {
  CdkVirtualScrollViewport,
  VirtualScrollStrategy,
} from '@angular/cdk/scrolling';
import { distinctUntilChanged, Observable, Subject } from 'rxjs';

export class HeroMessageVirtualScrollStrategy implements VirtualScrollStrategy {
  private readonly _scrolledIndexChange = new Subject<number>();

  scrolledIndexChange: Observable<number> = this._scrolledIndexChange.pipe(
    distinctUntilChanged(),
  );

  attach(viewport: CdkVirtualScrollViewport): void {
    throw new Error('Method not implemented.');
  }

  detach(): void {
    throw new Error('Method not implemented.');
  }

  onContentScrolled(): void {
    throw new Error('Method not implemented.');
  }

  onDataLengthChanged(): void {
    throw new Error('Method not implemented.');
  }

  onContentRendered(): void {
    throw new Error('Method not implemented.');
  }

  onRenderedOffsetChanged(): void {
    throw new Error('Method not implemented.');
  }

  scrollToIndex(index: number, behavior: ScrollBehavior): void {
    throw new Error('Method not implemented.');
  }
}
