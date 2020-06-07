import { AppUser } from './../models/app-user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  {
  appUser: AppUser;
  constructor(public afAuth: AuthService) { 
    afAuth.AppUser$.subscribe(appUser => this.appUser = appUser);
  }
  
  logOut(){
    this.afAuth.logOut();
  }

}
