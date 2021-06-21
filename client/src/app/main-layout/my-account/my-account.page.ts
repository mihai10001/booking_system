import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MyAccountService } from './my-account.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.css']
})
export class MyAccountPage implements OnInit {

  userForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private myAccountService: MyAccountService
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: {value: '', disabled: true},
      name: [''],
      new_password: [''],
      confirm_new_password: [''],
    });

    this.myAccountService.getUserObservable()
      .subscribe(data => {
        this.userForm = this.formBuilder.group({
          email: {value: data.email || '', disabled: true},
          name: [data.name || ''],
          new_password: [''],
          confirm_new_password: [''],
        });
      });
  }

  submitForm() {
    if (this.userForm.invalid) {
      return;
    }

    if (this.userForm.value.new_password && 
      this.userForm.value.new_password == this.userForm.value.confirm_new_password) {
        this.myAccountService
          .editUserObservable(this.userForm.value.name, this.userForm.value.confirm_new_password)
          .subscribe(
            () => this.router.navigateByUrl('/login')
          );
    } else if (this.userForm.value.name) {
      this.myAccountService
        .editUserObservable(this.userForm.value.name)
        .subscribe(
          () => console.log('Name modified')
        );
    }
  }
}
