import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

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
