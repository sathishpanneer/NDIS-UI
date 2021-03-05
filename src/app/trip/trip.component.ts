import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { TripService } from '../Core/Services/trip.service';
import { Trip } from '../Shared/Models/Trip.model';
import { AddTripComponent } from './add-trip/add-trip.component';
import { DeleteTripComponent } from './delete-trip/delete-trip.component';
import { UpdateTripComponent } from './update-trip/update-trip.component';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  displayedColumns = [ 'select','tripID', 'tripTypeID', 'tripDescription', 'registration', 'plannedKM', 
                                'actualKM', 'startDate', 'endDate', 'plannedStartStreet', 'plannedStartCity',
                                'plannedStartState','plannedStartPostalCode', 'actions'];
  selection = new SelectionModel<Trip>(true, []);
  dataSource = new MatTableDataSource<Trip>();
  progressCompleted: boolean = false;

  @ViewChild(MatPaginator, { static: false }) paginator: any;
  @ViewChild(MatSort, { static: false }) sort: any;

  constructor(public dialog: MatDialog, private tripService: TripService, private snackBar: MatSnackBar, private spinnerService: NgxSpinnerService) { }
  highlight(element: Trip) {
    element.highlighted = !element.highlighted;
  } 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.spinnerService.show();
    this.GetAllTrips();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  GetAllTrips() {
    this.tripService.getAllTrips().subscribe(data => {
      if (data) {
        this.dataSource.data = data;
        this.progressCompleted = true;
        this.spinnerService.hide();
      }
    });
  }
  AddTrip() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = <Trip>{};
    dialogConfig.width = "500px";

    const dialogRef = this.dialog.open(AddTripComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res == 1) {
        dialogConfig.data.numberOfTrips = Number(dialogConfig.data.numberOfTrips);
        this.tripService.createTrip(dialogConfig.data).subscribe(res => {
          if (res) {
            this.snackBar.open("Trip added successfully !!", "Done", {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });
            this.GetAllTrips();
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
  EditTrip(row: any) {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.width = "700px";
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.width = "500px";
    
    const dialogRef = this.dialog.open(UpdateTripComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.spinnerService.show();
      if (res == 1) {
        //dialogConfig.data.numberOfTrips = Number(dialogConfig.data.numberOfTrips);
        this.tripService.updateTrip(dialogConfig.data).subscribe(res => {
          if (res) {
            this.snackBar.open("Trip updated successfully !!", "Done", {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });

            this.GetAllTrips();
          } else {
            this.snackBar.open("Failed !!", '', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });
          }
        });
      } else {
        this.GetAllTrips();
      }
    });
  }

  DeleteTrip(empCode: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = empCode;

    const dialogRef = this.dialog.open(DeleteTripComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res === 1) {
        this.tripService.deleteTrip(dialogConfig.data).subscribe(res => {
          if (res) {
            this.snackBar.open('Trip deleted successfully !!', 'Done', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });
            this.GetAllTrips();
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
checkboxLabel(row: Trip): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.tripID + 1}`;  
} 


}
