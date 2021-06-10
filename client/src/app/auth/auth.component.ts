import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  userForm: any;
  isRegister: boolean = false;
  registerError;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.logout();

    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['']
    });
  }

  submitForm() {
    if (this.userForm.invalid) {
      return;
    }

    this.isRegister ? this.register() : this.login();
  }

  login() {
    this.authService.login(this.userForm.value.email, this.userForm.value.password);
  }

  register() {
    this.authService.registerObservable(this.userForm.value.email, this.userForm.value.password, this.userForm.value.name)
      .subscribe(
        (data) => {
          this.authService.login(this.userForm.value.email, this.userForm.value.password);
        },
        (error) => this.registerError = error.error
      );
  }

  switchRegister() {
    this.isRegister = !this.isRegister;
  }
}
