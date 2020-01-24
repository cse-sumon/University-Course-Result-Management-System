import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/shared/course.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  constructor(private courseService: CourseService, private fb:FormBuilder) { }

  courseForm =this.fb.group({
    id: [null],
    code: ['', Validators.required, Validators.minLength(5)],
    name: ['',Validators.required],
    credit: ['',Validators.required],
    description: [''],
    departmentId: [null,Validators.required],
    departmentName: [''],
    semesterId: [null, Validators.required],
    semesterName: [''],
    createdAt:['']

  });



  ngOnInit() {
    this.initializeCourseForm();
  }

  
  initializeCourseForm() {
    this.courseForm.setValue({
      id: null,
      code: null,
      name: null,
      credit: null,
      description: '',
      departmentId: null,
      departmentName: null,
      semesterId: null,
      semesterName: null,
      createdAt: ''
    });
  }


  clearForm(){
    this.courseForm.reset();
    this.initializeCourseForm();
  }

  onSubmit(){
    console.log(this.courseForm.value);
  }


}
