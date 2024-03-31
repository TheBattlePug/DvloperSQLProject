import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, RouterState } from '@angular/router';
import { inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

import { HttpClient } from '@angular/common/http';

import { UserAccount } from '../userAccount';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatInputModule],
})

export class LoginComponentComponent {

  constructor(private http: HttpClient, private router: Router, private keycloak: KeycloakService) {}

  //for now the username is the email
  @ViewChild('username') usernameInput?: ElementRef;
  @ViewChild('password') passwordInput?: ElementRef;
  
  handleClick()
  {
    const _username = this.usernameInput?.nativeElement.value;
    const _password= this.passwordInput?.nativeElement.value;

      try
      {
        this.http.get<UserAccount[]>('http://localhost:8000/api/userAccounts/').subscribe(data => {

        var finalData = data.filter((element) => {
          if(_username != "" && element.email == _username)
          {
            return element;
          }
          return null;
        })
      
        if(finalData != null)
        {
          if(finalData[0].password == _password)
          {
            localStorage.setItem('token', 'true')
          }
        }
        else
        {
          console.log("Password Incorrect!!!")
        }
      });
    }
    catch(error)
    {
      console.log("Something went wrong")
    }
  
  }
}
