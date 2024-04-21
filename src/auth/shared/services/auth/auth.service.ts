import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Store } from 'store';

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth$: Observable<firebase.default.User | null> = this.afAuth.authState.pipe(
    tap((firebaseUser) => {
      if (!firebaseUser) {
        this.store.set('user', null);
        return;
      }

      this.setAuthUser(firebaseUser);
    })
  );

  get currentUser(): User | undefined {
    return this.store.value.user;
  }

  get authState(): Observable<firebase.default.User | null> {
    return this.afAuth.authState;
  }

  constructor(private afAuth: AngularFireAuth, private store: Store) {}

  createUser(
    email: string,
    password: string
  ): Promise<firebase.default.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(
    email: string,
    password: string
  ): Promise<firebase.default.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logoutUser(): Promise<void> {
    return this.afAuth.signOut();
  }

  setAuthUser(firebaseUser: unknown): void {
    const { email, uid } = firebaseUser as any;

    this.store.set('user', { email, uid, authenticated: true });
  }
}
