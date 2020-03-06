import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentResult } from 'src/app/models/student-result.models';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { StudentResultService } from 'src/app/shared/student-result.service';
import { ToastrService } from 'ngx-toastr';
import { AddStudentResultComponent } from './add-student-result/add-student-result.component';

@Component({
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
  styleUrls: ['./student-result.component.css']
})
export class StudentResultComponent implements OnInit {
  ELEMENT_DATA: StudentResult[];
  displayedColumns: string[] = ['id', 'studentRegNo', 'studentName', 'studentEmail', 'departmentCode', 'courseCode','grade', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private studentResultService: StudentResultService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }


  ngOnInit() {
    this.getStudentResults();
  }
  getStudentResults() {
    this.studentResultService.getAllStudentResults().subscribe(
      res => {
        this.ELEMENT_DATA = <any>res;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      }
    );
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  onCreate(): void {
    this.studentResultService.studentResultForm.reset();
    const dialogRef = this.dialog.open(AddStudentResultComponent, {
      width: '50%',
      data: { formTitle: "Add Student Result", buttonName: "Submit" }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  onEdit(row) {
    this.studentResultService.populateForm(row);
    const dialogRef = this.dialog.open(AddStudentResultComponent, {
      width: '50%',
      data: { formTitle: "Update Student Result", buttonName: "Update" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  onDelete(id: number) {
    var result = confirm('Are you want to remove this ?')
    if (result) {
      this.studentResultService.deleteStudentResult(id).subscribe(
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
