import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  helper;

  constructor(private _auth: AuthService) {
  }

  ngOnInit(): void {

  }

  logoutUser() {
    this._auth.logoutUser();
    window.location.reload()
  }

  loggedIn() {
    return this._auth.checkUserLogin();
  }

}
