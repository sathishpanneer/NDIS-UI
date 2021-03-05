import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingService } from 'src/app/Core/Services/setting.service';
import { TripTypeInput } from 'src/app/Shared/Models/TripTypeInput.model';
import { TripTypes } from 'src/app/Shared/Models/TripTypes.model';
import { DeleteTripComponent } from 'src/app/trip/delete-trip/delete-trip.component';
import { UpdateTripComponent } from 'src/app/trip/update-trip/update-trip.component';
import { AddTripTypeComponent } from './add-trip-type/add-trip-type.component';
import { DeleteTripTypeComponent } from './delete-trip-type/delete-trip-type.component';
import { EditTripTypeComponent } from './edit-trip-type/edit-trip-type.component';

@Component({
  selector: 'app-trip-type',
  templateUrl: './trip-type.component.html',
  styleUrls: ['./trip-type.component.scss']
})
export class TripTypeComponent implements OnInit {

  displayedColumns = ['select', 'description', 'customerRequired', 'vehicleType', 'billableToSalesForce', 'costCenterType', 'defaultCostCenter', 'actions'];
  selection = new SelectionModel<TripTypes>(true, []);
  dataSource = new MatTableDataSource<TripTypes>();
  progressCompleted: boolean = false;

  @ViewChild(MatPaginator, { static: false }) paginator: any;
  @ViewChild(MatSort, { static: false }) sort: any;

  constructor(public dialog: MatDialog, private settingService: SettingService, private snackBar: MatSnackBar, private spinnerService: NgxSpinnerService) { }
  highlight(element: TripTypes) {
    element.highlighted = !element.highlighted;
  } 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngOnInit() {
    //this.spinnerService.show();
    this.GetAllTripTypes();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  GetAllTripTypes() {
    this.settingService.getAllTripTypes().subscribe(data => {
      if (data) {
        this.dataSource.data = data.getTrips;
        this.progressCompleted = true;
        this.spinnerService.hide();
      }
    });
  }

  AddTripType() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = <TripTypeInput>{};
    dialogConfig.width = "500px";

    const dialogRef = this.dialog.open(AddTripTypeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res == 1) {
        //dialogConfig.data.numberOfTrips = Number(dialogConfig.data.numberOfTrips);
        this.settingService.createTripType(dialogConfig.data).subscribe(res => {
          if (res) {
            this.snackBar.open("Trip Type added successfully !!", "Done", {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });
            this.GetAllTripTypes();
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
  EditTripType(row: any) {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.width = "700px";
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.width = "500px";
    
    const dialogRef = this.dialog.open(EditTripTypeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      //this.spinnerService.show();
      if (res == 1) {
        //dialogConfig.data.numberOfTrips = Number(dialogConfig.data.numberOfTrips);
        this.settingService.updateTripType(dialogConfig.data).subscribe(res => {
          if (res) {
            this.snackBar.open("Trip Type updated successfully !!", "Done", {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });

            this.GetAllTripTypes();
          } else {
            this.snackBar.open("Failed !!", '', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });
          }
        });
      } else {
        this.GetAllTripTypes();
      }
    });
  }

  DeleteTripType(empCode: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = empCode;

    const dialogRef = this.dialog.open(DeleteTripTypeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res === 1) {
        this.settingService.deleteTripType(dialogConfig.data).subscribe(res => {
          if (res) {
            this.snackBar.open('Trip Type deleted successfully !!', 'Done', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });
            this.GetAllTripTypes();
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
checkboxLabel(row: TripTypes): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.tripTypeID + 1}`;  
} 

}
