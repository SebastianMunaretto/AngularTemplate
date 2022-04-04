import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar1',
  templateUrl: './navbar1.component.html',
  styleUrls: ['./navbar1.component.scss']
})
export class Navbar1Component implements OnInit {

  helper;
  slideMenuClass: string;

  constructor(private _auth: AuthService) {
    this.slideMenuClass = "hidden"
  }

  ngOnInit(): void {

  }

  slideMenu() {
    if (this.slideMenuClass === "hidden"){
      this.slideMenuClass = "shown";
    }else {
      this.slideMenuClass = "hidden";
    }
  }

  logoutUser() {
    this._auth.logoutUser();
    window.location.reload()
  }

  loggedIn() {
    return this._auth.checkUserLogin();
  }

}
