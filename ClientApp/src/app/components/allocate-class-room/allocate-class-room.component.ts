import { Component, OnInit, ViewChild } from '@angular/core';
import { AllocateClassRoomService } from 'src/app/shared/allocate-class-room.service';
import { ToastrService } from 'ngx-toastr';
import { AllocateClassRoom } from 'src/app/models/allocate-class-room.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AddAllocateClassRoomComponent } from './add-allocate-class-room/add-allocate-class-room.component';

@Component({
  selector: 'app-allocate-class-room',
  templateUrl: './allocate-class-room.component.html',
  styleUrls: ['./allocate-class-room.component.css']
})
export class AllocateClassRoomComponent implements OnInit {
  ELEMENT_DATA: AllocateClassRoom[];
  displayedColumns: string[] = ['id', 'departmentName', 'courseCode', 'roomNumber', 'day', 'from', 'to', 'action'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private allocateClassRoomService: AllocateClassRoomService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getAllocateClassRoom();
    
  }

  getAllocateClassRoom(){
    this.allocateClassRoomService.getAllAllocateClassRoom().subscribe(
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
    this.allocateClassRoomService.allocateClassRoomForm.reset();
    const dialogRef = this.dialog.open(AddAllocateClassRoomComponent, {
      width: '50%',
      data: {formTitle: "Allocate New Class Room", buttonName: "Submit"}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }


  onEdit(row){
    this.allocateClassRoomService.populateForm(row);
    const dialogRef = this.dialog.open(AddAllocateClassRoomComponent, {
      width: '50%',
      data: {formTitle: "Update Allocated Class Room", buttonName: "Update"}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  onDelete(id){
    var result = confirm('Are you want to remove this ?')
    if (result) {
      this.allocateClassRoomService.deleteAllocateClassRoom(id).subscribe(
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
