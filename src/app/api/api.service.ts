import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { HeroMessage } from '../model/hero-message';
import { generateMessages } from './generator';

@Injectable()
export class ApiService {
  getHeroMessages$(pageSize: number = 10): Observable<HeroMessage[]> {
    return of(generateMessages(pageSize))
      .pipe(delay(1000));
  }
}
