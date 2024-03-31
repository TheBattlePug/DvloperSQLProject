import { Component, ElementRef, ViewChild } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatInputModule],
})

export class SignupComponent {

  @ViewChild('firstname') firstNameInput?: ElementRef;
  @ViewChild('lastname') lastNameInput?: ElementRef;
  @ViewChild('email') emailInput?: ElementRef;
  @ViewChild('password') passwordInput?: ElementRef;
  @ViewChild('passwordConfirm') passwordConfirmInput?: ElementRef;

  public showPass: boolean = false;
  public showPassConf: boolean = false;

  public newUser: any = {
    email: this.emailInput?.nativeElement.value,
    firstname: this.firstNameInput?.nativeElement.value,
    lastname: this.lastNameInput?.nativeElement.value,
    password: this.passwordInput?.nativeElement.value,
    passwordConfirm: this.passwordConfirmInput?.nativeElement.value
  }

  constructor(private http: HttpClient, private router: Router, private keycloak: KeycloakService) { }

  public register() {
    if(this.newUser.password == '' || this.newUser.email == '') {
      console.log('Please fill out all fields')
      alert('Please fill out all fields');
      return;
    }
    if(this.newUser.password !== this.newUser.passwordConfirm) {
      console.log('Passwords do not match')
      alert('Passwords do not match');
      return;
    }

    this.http.post('http://localhost:8000/api/userAccounts/ addAccount', this.newUser).subscribe((res) => {
      console.log(res);        
      this.router.navigate(['/']);
    });
  }

  public handleClick()
  {
    this.register()
  }

}