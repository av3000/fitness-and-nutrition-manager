import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { tap } from 'rxjs/operators';

import { Store } from 'store';

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable()
export class AuthService {
  auth$ = this.afAuth.authState.pipe(
    tap((firebaseUser) => {
      if (!firebaseUser) {
        this.store.set('user', null);
        return;
      }

      this.setAuthUser(firebaseUser);
    })
  );

  get authState() {
    return this.afAuth.authState;
  }

  constructor(private afAuth: AngularFireAuth, private store: Store) {}

  createUser(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.afAuth.signOut();
  }

  setAuthUser(firebaseUser: unknown) {
    const { email, uid } = firebaseUser as any;

    this.store.set('user', { email, uid, authenticated: true });
  }
}
