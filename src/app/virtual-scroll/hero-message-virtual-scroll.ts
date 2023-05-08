import {
  CdkVirtualScrollViewport,
  VirtualScrollStrategy,
} from '@angular/cdk/scrolling';
import { distinctUntilChanged, Observable, Subject } from 'rxjs';
import { HeroMessage } from '../model/hero-message';
import { heroMessageHeightPredictor } from './hero-message-height-predictor';

const PaddingAbove = 5;
const PaddingBelow = 5;

interface MessageHeight {
  value: number;
  source: 'predicted' | 'actual';
}

export class HeroMessageVirtualScrollStrategy implements VirtualScrollStrategy {
  _scrolledIndexChange$ = new Subject<number>();
  scrolledIndexChange: Observable<number> = this._scrolledIndexChange$.pipe(
    distinctUntilChanged(),
  );

  private _viewport!: CdkVirtualScrollViewport | null;
  private _wrapper!: ChildNode | null;
  private _messages: HeroMessage[] = [];
  private _heightCache = new Map<string, MessageHeight>();

  attach(viewport: CdkVirtualScrollViewport): void {
    this._viewport = viewport;
    this._wrapper = viewport.getElementRef().nativeElement.childNodes[0];

    if (this._messages) {
      this._viewport.setTotalContentSize(this._getTotalHeight());
      this._updateRenderedRange();
    }
  }

  detach(): void {
    this._viewport = null;
    this._wrapper = null;
  }

  onContentScrolled(): void {
    if (this._viewport) {
      this._updateRenderedRange();
    }
  }

  onDataLengthChanged(): void {
    if (!this._viewport) {
      return;
    }

    this._viewport.setTotalContentSize(this._getTotalHeight());
    this._updateRenderedRange();
  }

  onContentRendered(): void {
    /** no-op */
  }

  onRenderedOffsetChanged(): void {
    /** no-op */
  }

  scrollToIndex(index: number, behavior: ScrollBehavior): void {
    if (!this._viewport) {
      return;
    }

    const offset = this._getOffsetByMsgIdx(index);
    this._viewport.scrollToOffset(offset, behavior);
  }

  /**
   * Update the messages array.
   *
   * @param messages
   */
  updateMessages(messages: HeroMessage[]) {
    this._messages = messages;

    if (this._viewport) {
      this._viewport.checkViewportSize();
    }
  }

  /**
   * Returns the total height of the scrollable container
   * given the size of the elements.
   */
  private _getTotalHeight(): number {
    return this._measureMessagesHeight(this._messages);
  }

  /**
   * Returns the offset relative to the top of the container
   * by a provided message index.
   *
   * @param idx
   * @returns
   */
  private _getOffsetByMsgIdx(idx: number): number {
    return this._measureMessagesHeight(this._messages.slice(0, idx));
  }

  /**
   * Returns the message index by a provided offset.
   *
   * @param offset
   * @returns
   */
  private _getMsgIdxByOffset(offset: number): number {
    let accumOffset = 0;

    for (let i = 0; i < this._messages.length; i++) {
      const msg = this._messages[i];
      const msgHeight = this._getMsgHeight(msg);
      accumOffset += msgHeight;

      if (accumOffset >= offset) {
        return i;
      }
    }

    return 0;
  }

  /**
   * Measure messages height.
   *
   * @param messages
   * @returns
   */
  private _measureMessagesHeight(messages: HeroMessage[]): number {
    return messages
      .map((m) => this._getMsgHeight(m))
      .reduce((a, c) => a + c, 0);
  }

  /**
   * Determine the number of renderable messages
   * withing the viewport by given message index.
   *
   * @param startIdx
   * @returns
   */
  private _determineMsgsCountInViewport(startIdx: number): number {
    if (!this._viewport) {
      return 0;
    }

    let totalSize = 0;
    const viewportSize = this._viewport.getViewportSize();

    for (let i = startIdx; i < this._messages.length; i++) {
      const msg = this._messages[i];
      totalSize += this._getMsgHeight(msg);

      if (totalSize >= viewportSize) {
        return i - startIdx + 1;
      }
    }

    return 0;
  }

  /**
   * Update the range of rendered messages.
   *
   * @returns
   */
  private _updateRenderedRange() {
    if (!this._viewport) {
      return;
    }

    const scrollOffset = this._viewport.measureScrollOffset();
    const scrollIdx = this._getMsgIdxByOffset(scrollOffset);
    const dataLength = this._viewport.getDataLength();
    const renderedRange = this._viewport.getRenderedRange();
    const range = {
      start: renderedRange.start,
      end: renderedRange.end,
    };

    range.start = Math.max(0, scrollIdx - PaddingAbove);
    range.end = Math.min(
      dataLength,
      scrollIdx + this._determineMsgsCountInViewport(scrollIdx) + PaddingBelow,
    );

    this._viewport.setRenderedRange(range);
    this._viewport.setRenderedContentOffset(
      this._getOffsetByMsgIdx(range.start),
    );
    this._scrolledIndexChange$.next(scrollIdx);

    this._updateHeightCache();
  }

  /**
   * Get the height of a given message.
   * It could be either predicted or actual.
   * Results are memoized.
   *
   * @param m
   * @returns
   */
  private _getMsgHeight(m: HeroMessage): number {
    let height = 0;
    const cachedHeight = this._heightCache.get(m.id);

    if (!cachedHeight) {
      height = heroMessageHeightPredictor(m);
      this._heightCache.set(m.id, { value: height, source: 'predicted' });
    } else {
      height = cachedHeight.value;
    }

    return height;
  }

  /**
   * Update the height cache with the actual height
   * of the rendered message components.
   *
   * @returns
   */
  private _updateHeightCache() {
    if (!this._wrapper || !this._viewport) {
      return;
    }

    const nodes = this._wrapper.childNodes;
    let cacheUpdated: boolean = false;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i] as HTMLElement;

      if (node && node.nodeName === 'APP-HERO-MESSAGE') {
        const id = node.getAttribute('data-hm-id') as string;
        const cachedHeight = this._heightCache.get(id);

        if (!cachedHeight || cachedHeight.source !== 'actual') {
          const height = node.clientHeight;

          this._heightCache.set(id, { value: height, source: 'actual' });
          cacheUpdated = true;
        }
      }
    }

    if (cacheUpdated) {
      this._viewport.setTotalContentSize(this._getTotalHeight());
    }
  }
}
