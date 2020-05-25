import { Injectable } from '@angular/core';
import { AngularFireAuth }  from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  async login(){
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  async logOut() {
    this.afAuth.signOut();
  }
}
