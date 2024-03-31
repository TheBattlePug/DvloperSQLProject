import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatInputModule],
})

export class AddStudentComponent {

  constructor(private http: HttpClient) { }
  
  @ViewChild('name') nameInput?: ElementRef;
  @ViewChild('dob') dobInput?: ElementRef;
  @ViewChild('gender') genderInput?: ElementRef;


  handleClick() {
    const _name = this.nameInput?.nativeElement.value;
    const _dob = this.dobInput?.nativeElement.value;
    const _gender = this.genderInput?.nativeElement.value;
    
    this.http.post('http://localhost:8000/api/students', {name: _name, date_of_birth: _dob, gender: _gender})
    .subscribe(
      response => {
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
