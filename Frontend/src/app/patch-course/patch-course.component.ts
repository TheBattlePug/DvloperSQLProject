import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Course } from '../course';

import { ActivatedRoute } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-patch-course',
  templateUrl: './patch-course.component.html',
  styleUrls: ['./patch-course.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatInputModule],
})



export class PatchCourseComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  
  @ViewChild('id') idInput?: ElementRef;
  @ViewChild('name') nameInput?: ElementRef; 
  @ViewChild('capacity') capacityInput?: ElementRef;
  @ViewChild('myButton') myButton?: ElementRef;

  courseId: string | null = "";

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('courseId'); // Get the courseId route parameter
      // Now you can use this.courseId in your component
    });

    this.http.get<any>('http://localhost:8000/api/courses/' + this.courseId).subscribe(response => {

    const data = response.data.course;

      var myInput = document.getElementById('input1') as HTMLInputElement;
      if (myInput) {
        myInput.value = data.name;
      }
      
      myInput = document.getElementById('input2') as HTMLInputElement;
      if (myInput) {
        myInput.value = data.capacity;
      }
    })

  }

  handleClick()
  {
    const _name = this.nameInput?.nativeElement.value;
    const _capacity = this.capacityInput?.nativeElement.value;

    const courseId = this.courseId //this.idInput?.nativeElement.value;

    var ur = 'http://localhost:8000/api/courses/' + courseId


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

    if(_capacity > 0)
    {
      this.http.patch(ur, {capacity: _capacity})
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
