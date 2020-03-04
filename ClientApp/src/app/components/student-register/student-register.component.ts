import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentRegister } from 'src/app/models/student-register.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { StudentRegisterService } from 'src/app/shared/student-register.service';
import { DepartmentService } from 'src/app/shared/department.service';
import { ToastrService } from 'ngx-toastr';
import { AddStudentRegisterComponent } from './add-student-register/add-student-register.component';
import { DetailsStudentRegisterComponent } from './details-student-register/details-student-register.component';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {
  ELEMENT_DATA: StudentRegister[];
  displayedColumns: string[] = ['id', 'regNo', 'name', 'email', 'mobile', 'departmentName', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private studentRegisterService: StudentRegisterService,
    private departmentServie: DepartmentService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getStudentRegister();
  }

  getStudentRegister() {
    this.studentRegisterService.getAllStudentRegister().subscribe(
      res => {
        this.ELEMENT_DATA = <any>res;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onViewDetails(row: any) {
    this.studentRegisterService.populateForm(row);
    const dialogRef = this.dialog.open(DetailsStudentRegisterComponent, {
      width: '50%',
      height: '300px',
      data: { title: "Registered Student Details", rowData: row }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }


  onCreate(): void {
    this.studentRegisterService.studentRegisterForm.reset();
    this.studentRegisterService.studentRegisterForm.patchValue({
      createdAt: new Date
    })
    const dialogRef = this.dialog.open(AddStudentRegisterComponent, {
      width: '50%',
      data: { formTitle: "New Student Register", buttonName: "Submit" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  onEdit(row) {
    this.studentRegisterService.populateForm(row);
    const dialogRef = this.dialog.open(AddStudentRegisterComponent, {
      width: '50%',
      data: { formTitle: "Update Student Register", buttonName: "Update" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  onDelete(id: number) {
    var result = confirm('Are you want to remove this ?')
    if (result) {
      this.studentRegisterService.deleteStudentRegister(id).subscribe(
        res => {
          this.toastr.warning("Deleted Successfully");
          this.ngOnInit();
        },
        error => {
          console.log(error);
        });
    }
  }



}
