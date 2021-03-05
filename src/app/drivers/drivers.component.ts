import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { DriverProvider } from 'protractor/built/driverProviders';
import { AddClientComponent } from '../clients/add-client/add-client.component';
import { DeleteClientComponent } from '../clients/delete-client/delete-client.component';
import { UpdateClientComponent } from '../clients/update-client/update-client.component';
import { DriversService } from '../Core/Services/drivers.service';
import { Driver } from '../Shared/Models/Driver.model';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';
import { UpdateDriverComponent } from './update-driver/update-driver.component';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {

  displayedColumns = ['select', 'employeeCode', 'salesForceUserID', 'firstName', 'lastName', 'costCenter', 'username', 'disabled', 'type', 'actions'];
  selection = new SelectionModel<Driver >(true, []);
  dataSource = new MatTableDataSource<Driver>();
  progressCompleted: boolean = false;

  @ViewChild(MatPaginator, { static: false }) paginator: any;
  @ViewChild(MatSort, { static: false }) sort: any;

  constructor(public dialog: MatDialog, private driverService: DriversService, private snackBar: MatSnackBar, private spinnerService: NgxSpinnerService) { }
  highlight(element: Driver) {
    element.highlighted = !element.highlighted;
  } 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.spinnerService.show();
    this.GetAllDrivers();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  GetAllDrivers() {
    this.driverService.getAllDrivers().subscribe(data => {
      if (data) {
        this.dataSource.data = data;
        this.progressCompleted = true;
        this.spinnerService.hide();
      }
    });
  }

  AddDriver() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    //dialogConfig.height = "500px";
    dialogConfig.data = <Driver>{};

    const dialogRef = this.dialog.open(AddDriverComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res == 1) {
        dialogConfig.data.numberOfTrips = Number(dialogConfig.data.numberOfTrips);
        this.driverService.createDriver(dialogConfig.data).subscribe(res => {
          if (res) {
            this.snackBar.open("Driver added successfully !!", "Done", {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });
            this.GetAllDrivers();
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
  EditDriver(row: any) {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.width = "700px";
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.width = "500px";
    
    const dialogRef = this.dialog.open(UpdateDriverComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.spinnerService.show();
      if (res == 1) {
        dialogConfig.data.numberOfTrips = Number(dialogConfig.data.numberOfTrips);
        this.driverService.updateDriver(dialogConfig.data).subscribe(res => {
          if (res) {
            this.snackBar.open("Driver updated successfully !!", "Done", {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });

            this.GetAllDrivers();
          } else {
            this.snackBar.open("Failed !!", '', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });
          }
        });
      } else {
        this.GetAllDrivers();
      }
    });
  }

  DeleteDriver(empCode: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = empCode;

    const dialogRef = this.dialog.open(DeleteDriverComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res === 1) {
        this.driverService.deleteDriver(dialogConfig.data).subscribe(res => {
          if (res) {
            this.snackBar.open('Driver deleted successfully !!', 'Done', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });
            this.GetAllDrivers();
          } else {
            this.snackBar.open("Failed !!", "", {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });
          }
        })
      }
    });
  }


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
checkboxLabel(row: Driver): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.employeeCode + 1}`;  
} 

}
