import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import '@firebase/auth';
import * as firebase from 'firebase/app';
import { Observable, observable } from 'rxjs';
import { AppUser } from './models/app-user';
import { map, switchMap } from 'rxjs/operators';
import { empty, of } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user$: Observable<firebase.User>;
  userDetails$: firebase.User = null;
  constructor(private afAuth: AngularFireAuth, 
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { 
    this.user$ = afAuth.authState;
    this.user$.subscribe(
      user => {
        if (user){
          this.userDetails$ = user;
        }else{
          this.userDetails$ = null;
        }
      }
    )
 

  }

  async login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
      // .then((res) => this.router.navigate([returnUrl]));
  }

  async logOut() {
    this.afAuth.signOut();
  }

  public isLoggedIn(): boolean {
    return this.userDetails$ == null ? false : true;
  }

  get AppUser$() : Observable<AppUser>{
    return this.user$.pipe(switchMap(user => 
      {
        if (user) {
          return this.userService.get(user.uid);
        }else
          return of(null);
      }));
  }
}
