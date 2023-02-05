import { Injectable } from '@angular/core';
import { BehaviorSubject, take, withLatestFrom } from 'rxjs';
import { ApiService } from './api/api.service';
import { HeroMessage } from './model/hero-message';

@Injectable()
export class HeroMessagesService {
  messages$ = new BehaviorSubject<HeroMessage[]>([]);

  constructor(private _api: ApiService) {}

  loadMessages() {
    this._api
      .getHeroMessages$(100)
      .pipe(withLatestFrom(this.messages$), take(1))
      .subscribe(([apiMsgs, stateMsgs]) => {
        this.messages$.next([...stateMsgs, ...apiMsgs]);
      });
  }
}
