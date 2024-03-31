import {Component, OnInit, ElementRef, ViewChild, AfterViewInit, NgModule, AfterContentInit} from '@angular/core';
import { Observable } from 'rxjs';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import {Student} from '../student'
import { NgFor } from '@angular/common';

import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';

import {Sort, MatSortModule, MatSort} from '@angular/material/sort';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { AuthGuard } from '../keycloak/app.guard';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA_2: Student[] = [
  {_id: 1, name: 'Bianca', date_of_birth: "01-02-2001", gender: "female", created_at: new Date(), updated_at: new Date()},
  {_id: 1, name: 'Max', date_of_birth: "05-01-2003", gender: "male", created_at: new Date(), updated_at: new Date()},
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'table-basic-example',
  styleUrls: ['table-basic-example.css'],
  templateUrl: 'table-basic-example.html',
  standalone: true,
  imports: [MatPaginatorModule, MatSortModule, MatTableModule, NgFor, RouterModule, MatIconModule, MatButtonModule, MatInputModule, MatToolbarModule]
})

export class TableBasicExample implements OnInit
{

  displayedColumns: string[] = ['id', 'name', 'date_of_birth', 'gender', 'created_at', 'updated_at', 'actions'];
  dataSource: MatTableDataSource<Student>= new MatTableDataSource(ELEMENT_DATA_2);
  dataSourceWithPageSize = new MatTableDataSource(ELEMENT_DATA_2);

  constructor(private http: HttpClient, private _liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator; 

  @ViewChild('name') nameInput?: ElementRef; 
  @ViewChild('dob') dobInput?: ElementRef;
  @ViewChild('gender') genderInput?: ElementRef;

  data$: Observable<Student[]> = new Observable<Student[]>(); // Observable to hold the data

  //keycloak

  ngOnInit()
  {
    const _name = this.nameInput?.nativeElement.value;
    const _dob = this.dobInput?.nativeElement.value;
    const _gender = this.genderInput?.nativeElement.value;

    this.http.get<Student[]>('http://localhost:8000/api/students').subscribe(data => {

    var finalData = data.filter((element) => {
      if(_name != "" && element.name == _name)
      {
        return element;
      }
      if(_dob != "" && element.date_of_birth == _dob)
      {
        return element;
      }
      if(_gender != "" && element.gender == _gender)
      {
        return element;
      }
      return null;
    })

    if(finalData.length > 0)
    {
      this.dataSource = new MatTableDataSource(finalData)
    }
    else
    {
      this.dataSource = new MatTableDataSource(data)
    }
      
      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;
    })    
  }

  onClick()
  {
    this.ngOnInit()
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onPaginationChange(event: any)
  {
    this.ngOnInit()
  }
  
  getEnrolledCourseString(studentId: any): string {
    // Assuming you are using Mongoose ObjectId
    return JSON.stringify(studentId._id)
  }

  deleteItem(studentId: any)
  {

    var ur = 'http://localhost:8000/api/students/' + studentId

    this.http.delete<Student>(ur).subscribe((response) => {
      console.log('Deletion successful', response);
    }, 
    (error) => {
      console.error('Deletion failed', error)
    }
    )
  }

  validateIdentity()
  {
  
  }
}