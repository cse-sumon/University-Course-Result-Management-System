import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  ELEMENT_DATA;
  displayedColumns: string[] = ['fullName', 'userName','email', 'phoneNumber','createdBy', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllUsers();
 
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(
      res=>{
        this.ELEMENT_DATA = <any>res;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error=>{
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


  onCreate(): void {
    this.userService.formModel.reset();
    const dialogRef = this.dialog.open(RegistrationComponent, {
      width: '50%',
      data: {formTitle: "Add New User", buttonName: "Submit"}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  onDelete(id) {
    var result = confirm('Are you want to remove this ?')
    if (result) {
      this.userService.deleteUser(id).subscribe(
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
