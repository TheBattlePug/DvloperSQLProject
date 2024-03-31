import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Student } from '../student';
import { response } from 'express';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-patch-student',
  templateUrl: './patch-student.component.html',
  styleUrls: ['./patch-student.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatInputModule],
})

export class PatchStudentComponent implements OnInit{

  defaultText: string = 'Default Text';

  constructor(private http: HttpClient,  private route: ActivatedRoute) { }
  
  @ViewChild('name') nameInput?: ElementRef;
  @ViewChild('dob') dobInput?: ElementRef;
  @ViewChild('gender') genderInput?: ElementRef;

  studentId: string | null = "";

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = params['studentId']
    })

    this.http.get<any>('http://localhost:8000/api/students/' + this.studentId).subscribe(response => {

    const data = response.data.student;

      var myInput = document.getElementById('input1') as HTMLInputElement;
      if (myInput) {
        myInput.value = data.name;
      }
      
      myInput = document.getElementById('input2') as HTMLInputElement;
      if (myInput) {
        myInput.value = data.date_of_birth;
      }

      myInput = document.getElementById('input3') as HTMLInputElement;
      if (myInput) {
        myInput.value = data.gender;
      } 
    })
  }

  handleClick() {
    const _name = this.nameInput?.nativeElement.value;
    const _dob = this.dobInput?.nativeElement.value;
    const _gender = this.genderInput?.nativeElement.value;
    
    const studentId = this.studentId //this.idInput?.nativeElement.value;

    var ur = 'http://localhost:8000/api/students/' + studentId

    

    if(_name.length > 0)
    {
      this.http.patch(ur, {name: _name})
      .subscribe(
        (response) => {
          console.log('PATCH request successful:', response);
          // Handle the response from the server
        },
        error => {
          console.error('PATCH request error:', error);
          // Handle any errors that occurred during the request
        }
      );
    }

    if(_dob.length > 0)
    {
      console.log(ur)
      this.http.patch(ur, { date_of_birth: _dob})
      .subscribe(
        (response) => {
          console.log('PATCH request successful:', response);
          // Handle the response from the server
        },
        error => {
          console.error('PATCH request error:', error);
          // Handle any errors that occurred during the request
        }
      );
    }

    if(_gender.length > 0)
    {
      this.http.patch(ur, { gender: _gender})
      .subscribe(
        (response) => {
          console.log('PATCH request successful:', response);
          // Handle the response from the server
        },
        error => {
          console.error('PATCH request error:', error);
          // Handle any errors that occurred during the request
        }
      );
    }
    
  }

}
