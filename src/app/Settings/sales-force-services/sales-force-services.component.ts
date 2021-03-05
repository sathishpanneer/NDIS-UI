import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { SettingService } from 'src/app/Core/Services/setting.service';
import { SalesForceService } from 'src/app/Shared/Models/SalesForceService.model';

@Component({
  selector: 'app-sales-force-services',
  templateUrl: './sales-force-services.component.html',
  styleUrls: ['./sales-force-services.component.scss']
})
export class SalesForceServicesComponent implements OnInit {

  displayedColumns = ['select', 'serviceID', 'description','actions'];
  selection = new SelectionModel<SalesForceService>(true, []);
  dataSource = new MatTableDataSource<SalesForceService>();
  progressCompleted: boolean = false;

  @ViewChild(MatPaginator, { static: false }) paginator: any;
  @ViewChild(MatSort, { static: false }) sort: any;

  constructor(public dialog: MatDialog, private settingService: SettingService, private snackBar: MatSnackBar, private spinnerService: NgxSpinnerService) { }
  highlight(element: SalesForceService) {
    element.highlighted = !element.highlighted;
  } 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngOnInit() {
    //this.spinnerService.show();
    this.GetAllSalesforceService();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  GetAllSalesforceService() {
    this.settingService.getAllSalesforceSevice().subscribe(data => {
      if (data) {
        this.dataSource.data = data.getSalesforceService;
        this.progressCompleted = true;
        this.spinnerService.hide();
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
checkboxLabel(row: SalesForceService): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.serviceID + 1}`;  
} 

}
