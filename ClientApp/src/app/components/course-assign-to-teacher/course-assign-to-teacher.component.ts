import { Component, OnInit } from '@angular/core';
import { AddCourseAssignToTeacherComponent } from './add-course-assign-to-teacher/add-course-assign-to-teacher.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-course-assign-to-teacher',
  templateUrl: './course-assign-to-teacher.component.html',
  styleUrls: ['./course-assign-to-teacher.component.css']
})
export class CourseAssignToTeacherComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }



  onCreate(): void {
    // this.teacherService.teacherForm.reset();
    const dialogRef = this.dialog.open(AddCourseAssignToTeacherComponent, {
      width: '50%',
      data: {formTitle: "Course Assign to Teacher", buttonName: "Submit"}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }





}
