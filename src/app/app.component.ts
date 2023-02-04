import { Component } from '@angular/core';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hero-feed';

  constructor(private _api: ApiService) {
    this._api.getHeroMessages$(20)
      .subscribe((p) => console.log(p));
  }
}
