import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';

const ActiveZone = 150; // pixels

@Component({
  selector: 'app-infinite-scroll',
  template: '',
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {
  @Output() endReached = new EventEmitter<void>();
  private _unlisten!: () => void;
  private _endLock: boolean = false;

  constructor(private _elRef: ElementRef, private _renderer: Renderer2) {}

  ngOnInit() {
    const parent = this._elRef.nativeElement.parentElement;

    this._unlisten = this._renderer.listen(parent, 'scroll', (e: Event) => {
      const target = e.target as HTMLElement;
      const scrollTop = target.scrollTop + target.clientHeight;
      const endReached = scrollTop + ActiveZone >= target.scrollHeight;

      if (endReached && !this._endLock) {
        this.endReached.emit();
        this._endLock = true;
      } else if (!endReached) {
        this._endLock = false;
      }
    });
  }

  ngOnDestroy() {
    this._unlisten();
  }
}
