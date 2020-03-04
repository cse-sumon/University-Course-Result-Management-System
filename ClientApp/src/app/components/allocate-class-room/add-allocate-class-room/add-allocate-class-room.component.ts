import { Component, OnInit, Inject } from '@angular/core';
import { AllocateClassRoomService } from 'src/app/shared/allocate-class-room.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/shared/department.service';
import { CourseService } from 'src/app/shared/course.service';
import { CourseAssignToTeacherService } from 'src/app/shared/course-assign-to-teacher.service';

@Component({
  selector: 'app-add-allocate-class-room',
  templateUrl: './add-allocate-class-room.component.html',
  styleUrls: ['./add-allocate-class-room.component.css']
})
export class AddAllocateClassRoomComponent implements OnInit {
  departmentList: any;
  courseList: any;
  roomList: any;
  dayList: string[] = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  constructor(
    private allocateClassRoomService: AllocateClassRoomService,
    private departmentService: DepartmentService,
    private courseAssignService: CourseAssignToTeacherService,
    private dialogRef: MatDialogRef<AddAllocateClassRoomComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getAllDepartment();
    this.getRooms();
    //show course list & selected course with updated form
    var departmentId = this.allocateClassRoomService.allocateClassRoomForm.get('departmentId').value;
    if (departmentId > 0) {
      this.onChangeDepartment(departmentId);
    }

  }

  onNoClick(): void {
    this.allocateClassRoomService.allocateClassRoomForm.reset();
    this.dialogRef.close();
  }



  onClear() {
    this.allocateClassRoomService.allocateClassRoomForm.reset();
    this.allocateClassRoomService.initializeAllocateClassRoomForm();
  }


  getRooms() {
    this.allocateClassRoomService.getAllRoom().subscribe(
      res => {
        this.roomList = res;
      },
      error => {
        console.log(error);
      }
    )
  }


  getAllDepartment() {
    this.departmentService.getAllDepartments().subscribe(
      res => {
        this.departmentList = res;
      },
      error => {
        console.log(error);
      }
    )
  }

  //get all course by department id
  onChangeDepartment(id) {
    this.courseAssignService.getCourseByDepartmentId(id).subscribe(
      res => {
        this.courseList = <any>res;
      },
      error => {
        console.log(error);
      }
    )
  }


  onSubmit(allocateClassRoomForm) {
    // console.log(allocateClassRoomForm.value);
    // let from= allocateClassRoomForm.get('from').value;
    // let to = allocateClassRoomForm.get('to').value;
    // if(from>=12){
    //   allocateClassRoomForm.get('from')
    // }


    // return;

    if (this.allocateClassRoomService.allocateClassRoomForm.valid) {
      let allocateRoom = {
        departmentId: allocateClassRoomForm.get('departmentId').value,
        courseId: allocateClassRoomForm.get('courseId').value,
        roomId: allocateClassRoomForm.get('roomId').value,
        day: allocateClassRoomForm.get('day').value,
        from: allocateClassRoomForm.get('from').value,
        to: allocateClassRoomForm.get('to').value,
      };
      if (allocateClassRoomForm.get('id').value == null) {
        this.insertAllocateClassRoom(allocateRoom);
      }
      else {
        let id = allocateClassRoomForm.get('id').value;
        let allocateRoom = {
          id: id,
          departmentId: allocateClassRoomForm.get('departmentId').value,
          courseId: allocateClassRoomForm.get('courseId').value,
          roomId: allocateClassRoomForm.get('roomId').value,
          day: allocateClassRoomForm.get('day').value,
          from: allocateClassRoomForm.get('from').value,
          to: allocateClassRoomForm.get('to').value,
        };
        this.updateAllocateClassRoom(id, allocateRoom);
      }
    }
    else {
      console.log("Please send valid data", this.allocateClassRoomService.allocateClassRoomForm.value);
    }
  }


  insertAllocateClassRoom(allocateRoom) {
    return this.allocateClassRoomService.postAllocateClassRoom(allocateRoom).subscribe(
      res => {
        this.toastr.success("Added Successfully!");
        console.log("Added");
        this.onClear();
        this.ngOnInit();
      },
      error => {
        if (error.error == "Duplicate") {
          this.toastr.warning("This room already allocated.")
        }

        console.log(error);
      }
    );
  }

  updateAllocateClassRoom(id, allocateRoom) {
    return this.allocateClassRoomService.putAllocateClassRoom(id, allocateRoom).subscribe(
      res => {
        this.toastr.info("Updated Successfully!");
        console.log("Updated");
        this.onClear();
        this.onNoClick();
      },
      error => {
        console.log(error);
      }
    );
  }














}
