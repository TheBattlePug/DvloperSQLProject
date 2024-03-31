import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Course } from '../course';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

import { AuthGuard } from '../keycloak/app.guard';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatInputModule]
})

export class AddCourseComponent {

  //keycloak
  constructor(private http: HttpClient, protected readonly keycloak: KeycloakService) { }
  
  @ViewChild('name') nameInput?: ElementRef;
  @ViewChild('capacity') capacityInput?: ElementRef;
  @ViewChild('myButton') myButton?: ElementRef;

  handleClick()
  {
    const _name = this.nameInput?.nativeElement.value;
    const _capacity = this.capacityInput?.nativeElement.value;
    
    console.log(_name)
    console.log(_capacity)

    this.http.post('http://localhost:8000/api/courses', {name: _name, capacity: _capacity})
    .subscribe(
      (response) => {
        console.log('POST request successful:', response);
        // Handle the response from the server
      },
      error => {
        console.error('POST request error:', error);
        // Handle any errors that occurred during the request
      }
    );
  }

}
