import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  processing = false;
  form: FormGroup;
  message = " ";
  messageClass = " ";

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this._formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ])],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
  }

  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
  }

  onRegisterSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }

    console.log(user)

    this._authService.registerUser(user).subscribe(data => {
      // server returns message with sucess bool
      if (!data.sucess) {
        // sets bootstrap class and message
        this.messageClass = 'alert alert-danger'
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success'
        this.message = data.message;
        setTimeout(() => { this._router.navigate(['/login']) }, 2000);
      }
    });
  }


  ngOnInit(): void {
  }

}
