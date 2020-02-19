import { Component, OnInit, ViewChild } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/shared/department.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AddDepartmentComponent } from './add-department/add-department.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  ELEMENT_DATA: Department[];
  displayedColumns: string[] = ['id', 'code', 'name', 'createdAt', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private departmentService: DepartmentService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    ) { }


  ngOnInit() {
    this.getDepartments();

  }

  getDepartments() {
    this.departmentService.getAllDepartments().subscribe(
      res => {
        this.ELEMENT_DATA = <any>res;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onCreate(): void {
    this.departmentService.initializeDepartmentForm();
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      width: '30%',
      data: {formTitle: "Add New Department", buttonName: "Submit"}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  onEdit(id: number) {
    this.departmentService.getDepartment(id).subscribe(
      res => {
        this.departmentService.populateForm(res);
        const dialogRef = this.dialog.open(AddDepartmentComponent, {
          width: '30%',
          data: {formTitle: "Update Department", buttonName: "Update"}
        });
    
        dialogRef.afterClosed().subscribe(result => {
          this.ngOnInit();
        });
      },
      error => {
        console.log(error);
      });
  }

  onDelete(id: number) {
    console.log(id);
    var result = confirm("Are you want to remove this?");
    if (result) {
      this.departmentService.deleteDepartment(id).subscribe(
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
