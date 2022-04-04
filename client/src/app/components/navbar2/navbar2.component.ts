import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.scss']
})
export class Navbar2Component {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private _auth: AuthService) {
    this.slideMenuClass = "hidden"

  }

  helper;
  slideMenuClass: string;


  ngOnInit(): void {

  }

  slideMenu() {
    if (this.slideMenuClass === "hidden") {
      this.slideMenuClass = "shown";
    } else {
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
