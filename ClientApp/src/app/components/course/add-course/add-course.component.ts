import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/shared/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  constructor(private courseService: CourseService) { }

  ngOnInit() {
  }

}
