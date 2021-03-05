import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingService } from 'src/app/Core/Services/setting.service';
import { CostCentre } from 'src/app/Shared/Models/CostCentre.model';
import { AddCostCentreComponent } from './add-cost-centre/add-cost-centre.component';
import { DeleteCostCentreComponent } from './delete-cost-centre/delete-cost-centre.component';
import { UpdateCostCentreComponent } from './update-cost-centre/update-cost-centre.component';

@Component({
  selector: 'app-cost-centre',
  templateUrl: './cost-centre.component.html',
  styleUrls: ['./cost-centre.component.scss']
})
export class CostCentreComponent implements OnInit {

  displayedColumns = ['select', 'costCentre', 'description','actions'];
  selection = new SelectionModel<CostCentre>(true, []);
  dataSource = new MatTableDataSource<CostCentre>();
  progressCompleted: boolean = false;

  @ViewChild(MatPaginator, { static: false }) paginator: any;
  @ViewChild(MatSort, { static: false }) sort: any;

  constructor(public dialog: MatDialog, private settingService: SettingService, private snackBar: MatSnackBar, private spinnerService: NgxSpinnerService) { }
  highlight(element: CostCentre) {
    element.highlighted = !element.highlighted;
  } 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngOnInit() {
    //this.spinnerService.show();
    this.GetAllCostCentres();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  GetAllCostCentres() {
    this.settingService.getAllCostCentres().subscribe(data => {
      if (data) {
        this.dataSource.data = data.getCostCentres;
        this.progressCompleted = true;
        this.spinnerService.hide();
      }
    });
  }

  AddCostCentre() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = <CostCentre>{};
    dialogConfig.width = "500px";

    const dialogRef = this.dialog.open(AddCostCentreComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res == 1) {
        //dialogConfig.data.numberOfTrips = Number(dialogConfig.data.numberOfTrips);
        this.settingService.createTripType(dialogConfig.data).subscribe(res => {
          if (res) {
            this.snackBar.open("Cost centre added successfully !!", "Done", {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });
            this.GetAllCostCentres();
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
  EditCostCentre(row: any) {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.width = "700px";
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.width = "500px";
    
    const dialogRef = this.dialog.open(UpdateCostCentreComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      //this.spinnerService.show();
      if (res == 1) {
        //dialogConfig.data.numberOfTrips = Number(dialogConfig.data.numberOfTrips);
        this.settingService.updateTripType(dialogConfig.data).subscribe(res => {
          if (res) {
            this.snackBar.open("Cost Centre updated successfully !!", "Done", {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });

            this.GetAllCostCentres();
          } else {
            this.snackBar.open("Failed !!", '', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });
          }
        });
      } else {
        this.GetAllCostCentres();
      }
    });
  }

  DeleteCostCentre(costCentreId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = costCentreId;

    const dialogRef = this.dialog.open(DeleteCostCentreComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res === 1) {
        this.settingService.deleteTripType(dialogConfig.data).subscribe(res => {
          if (res) {
            this.snackBar.open('Cost CentreId deleted successfully !!', 'Done', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });
            this.GetAllCostCentres();
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
checkboxLabel(row: CostCentre): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.costCentre + 1}`;  
} 

}
