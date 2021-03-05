import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Vehicle } from '../Shared/Models/Vehicle.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VehicleService } from '../Core/Services/vehicle.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddVehicleComponent } from '../../app/vehicles/add-vehicle/add-vehicle.component';
import { UpdateVehicleComponent } from './update-vehicle/update-vehicle.component';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  displayedColumns = ['select', 'registration', 'type', 'make', 'model', 'category', 'actions'];
  selection = new SelectionModel<Vehicle >(true, []);
  dataSource = new MatTableDataSource<Vehicle>();
  progressCompleted: boolean = false;

  @ViewChild(MatPaginator, { static: false }) paginator: any;
  @ViewChild(MatSort, { static: false }) sort: any;

  constructor(public dialog: MatDialog, private vehicleService: VehicleService, private snackBar: MatSnackBar, private spinnerService: NgxSpinnerService) { }
  highlight(element: Vehicle) {
    element.highlighted = !element.highlighted;
  } 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.spinnerService.show();
    this.GetAllVehicle();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  GetAllVehicle() {
    this.vehicleService.getAllVehicle().subscribe(data => {
      if (data) {
        this.dataSource.data = data;
        this.progressCompleted = true;
        this.spinnerService.hide();
      }
    });
  }

  AddVehicle() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = <Vehicle>{};
    dialogConfig.width = "500px";

    const dialogRef = this.dialog.open(AddVehicleComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res == 1) {
        dialogConfig.data.numberOfTrips = Number(dialogConfig.data.numberOfTrips);
        this.vehicleService.createVehicle(dialogConfig.data).subscribe(res => {
          if (res) {
            this.snackBar.open("Vehicle added successfully !!", "Done", {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });
            this.GetAllVehicle();
          } else {
            this.snackBar.open("Failed !!", "", {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });
          }
        })
      }
    });
  }
  EditVehicle(row: any) {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.width = "700px";
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.width = "500px";
    
    const dialogRef = this.dialog.open(UpdateVehicleComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.spinnerService.show();
      if (res == 1) {
        dialogConfig.data.numberOfTrips = Number(dialogConfig.data.numberOfTrips);
        this.vehicleService.updateVehicle(dialogConfig.data).subscribe(res => {
          if (res) {
            this.snackBar.open("Vehicle updated successfully !!", "Done", {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });

            this.GetAllVehicle();
          } else {
            this.snackBar.open("Failed !!", '', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });
          }
        });
      } else {
        this.GetAllVehicle();
      }
    });
  }

  // DeleteDriver(empCode: string) {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.data = empCode;

  //   const dialogRef = this.dialog.open(DeleteClientComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe(res => {
  //     if (res === 1) {
  //       this.driverService.deleteDriver(dialogConfig.data).subscribe(res => {
  //         if (res) {
  //           this.snackBar.open('Client deleted successfully !!', 'Done', {
  //             duration: 3000,
  //             verticalPosition: 'top',
  //             panelClass: ['snack-bar']
  //           });
  //           this.GetAllDrivers();
  //         } else {
  //           this.snackBar.open("Failed !!", "", {
  //             duration: 3000,
  //             verticalPosition: 'top',
  //             panelClass: ['snack-bar']
  //           });
  //         }
  //       })
  //     }
  //   });
  // }


  /** Whether the number of selected elements matches the total number of rows. */  
  isAllSelected() {  
    const numSelected = this.selection.selected.length;  
    const numRows = !!this.dataSource && this.dataSource.data.length;  
    return numSelected === numRows;  
}  
/** Selects all rows if they are not all selected; otherwise clear selection. */  
masterToggle() {  
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(r => this.selection.select(r));  
}  
/** The label for the checkbox on the passed row */  
checkboxLabel(row: Vehicle): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.registration + 1}`;  
} 

}
