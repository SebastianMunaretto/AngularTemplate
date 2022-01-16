import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user;

  constructor(
    private authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    if (!this.authService.checkUserLogin())
      this._router.navigate(['/login'])

    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    });
  }

}
