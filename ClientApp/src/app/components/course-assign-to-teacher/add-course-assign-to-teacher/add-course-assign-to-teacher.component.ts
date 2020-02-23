import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TeacherService } from 'src/app/shared/teacher.service';
import { CourseService } from 'src/app/shared/course.service';
import { CourseAssignToTeacherService } from 'src/app/shared/course-assign-to-teacher.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-course-assign-to-teacher',
  templateUrl: './add-course-assign-to-teacher.component.html',
  styleUrls: ['./add-course-assign-to-teacher.component.css']
})
export class AddCourseAssignToTeacherComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddCourseAssignToTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private teacherService : TeacherService,
    private courseService : CourseService,
    private courseAssignService : CourseAssignToTeacherService,
    private toastr : ToastrService,
  ) { }

  ngOnInit() {
    
  }

  onNoClick(): void {
    // this.teacherService.teacherForm.reset();
    // this.teacherService.initializeTeacherForm();
    this.dialogRef.close();
  }

}
