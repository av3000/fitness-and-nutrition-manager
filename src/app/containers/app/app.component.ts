import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService, User } from 'src/auth/shared/services/auth/auth.service';
import { Store } from 'store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$ = this.store.select<User>('user');
  private subs$ = new Subscription();

  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit() {
    this.subs$.add(this.authService.auth$.subscribe());
  }

  ngOnDestroy() {
    this.subs$.unsubscribe();
  }
}
