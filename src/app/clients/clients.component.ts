import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientService } from '../Core/Services/client.service';
import { client } from '../Shared/Models/client.model';
import { AddClientComponent } from './add-client/add-client.component';
import { DeleteClientComponent } from './delete-client/delete-client.component';
import { UpdateClientComponent } from './update-client/update-client.component';

// export interface PeriodicElement {
//   Name: string;
//   ClientID: number;
//   Address: string;
//   Contact: string;
//   Trips: number
// }


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})


export class ClientsComponent implements OnInit {

  displayedColumns = ['select', 'clientName', 'clientID', 'homeAddress', 'contact', 'numberOfTrips', 'actions'];
  selection = new SelectionModel<client>(true, []);
  dataSource = new MatTableDataSource<client>();
  progressCompleted: boolean = false;

  @ViewChild(MatPaginator, { static: false }) paginator: any;
  @ViewChild(MatSort, { static: false }) sort: any;

  constructor(public dialog: MatDialog, private clientService: ClientService, private snackBar: MatSnackBar, private spinnerService: NgxSpinnerService) { }
  highlight(element: client) {
    element.highlighted = !element.highlighted;
  } 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngOnInit() {
    //this.spinnerService.show();
    this.GetAllClients();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  GetAllClients() {
    this.clientService.getAllClients().subscribe(data => {
      if (data) {
        this.dataSource.data = data.getClients;
        this.progressCompleted = true;
        this.spinnerService.hide();
      }
    });
  }
  AddClient() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = <client>{};

    const dialogRef = this.dialog.open(AddClientComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res == 1) {
        dialogConfig.data.numberOfTrips = Number(dialogConfig.data.numberOfTrips);
        this.clientService.createClient(dialogConfig.data).subscribe(res => {
          if (res) {
            this.snackBar.open("Client added successfully !!", "Done", {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });
            this.GetAllClients();
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
  EditClient(row: any) {
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.width = "700px";
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    
    const dialogRef = this.dialog.open(UpdateClientComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      this.spinnerService.show();
      if (res == 1) {
        dialogConfig.data.numberOfTrips = Number(dialogConfig.data.numberOfTrips);
        this.clientService.updateClient(dialogConfig.data).subscribe(res => {
          if (res) {
            this.snackBar.open("Client updated successfully !!", "Done", {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });

            this.GetAllClients();
          } else {
            this.snackBar.open("Failed !!", '', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });
          }
        });
      } else {
        this.GetAllClients();
      }
    });
  }

  DeleteClient(clientID: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = clientID;

    const dialogRef = this.dialog.open(DeleteClientComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res === 1) {
        this.clientService.deleteClient(dialogConfig.data).subscribe(res => {
          if (res) {
            this.snackBar.open('Client deleted successfully !!', 'Done', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snack-bar']
            });
            this.GetAllClients();
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
checkboxLabel(row: client): string {  
    if (!row) {  
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;  
    }  
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.clientID + 1}`;  
}  
DeleteData() {  
    debugger;  
    const numSelected = this.selection.selected;  
    // if (numSelected.length > 0) {  
    //   const dialogConfig = new MatDialogConfig();
    //   //dialogConfig.width = "700px";
    //   dialogConfig.disableClose = true;
    //   dialogConfig.autoFocus = true;
    //   dialogConfig.data = numSelected[0];
      
    //   this.dialog.open(UpdateClientComponent,dialogConfig);
    //   this.dialog.afterAllClosed.subscribe(res => {
    //     if(numSelected.length > 0){
    //       let i =+ 1;
    //       dialogConfig.data = numSelected[i];
    //       this.dialog.open(UpdateClientComponent,dialogConfig);
    //       i++;
    //     }
    //   })

    // } else {  
    //     alert("Select at least one row");  
    // }  
}

}
// const ELEMENT_DATA: PeriodicElement[] = [
//   {Name: 'Johnson', ClientID: 101100111, Address: '26, ABC street, Chippendale, Sydney', Contact: '+61 7 7010 4122', Trips:6},
//   {Name: 'Johnson', ClientID: 101100111, Address: '26, ABC street, Chippendale, Sydney', Contact: '+61 7 7010 4122', Trips:6},
//   {Name: 'Johnson  ', ClientID: 101100111, Address: '26, ABC street, Chippendale, Sydney', Contact: '+61 7 7010 4122', Trips:6},
//   {Name: 'Johnson', ClientID: 101100111, Address: '26, ABC street, Chippendale, Sydney', Contact: '+61 7 7010 4122', Trips:6},
//   {Name: 'Johnson', ClientID: 101100111, Address: '26, ABC street, Chippendale, Sydney', Contact: '+61 7 7010 4122', Trips:6},
//   {Name: 'Johnson', ClientID: 101100111, Address: '26, ABC street, Chippendale, Sydney', Contact: '+61 7 7010 4122', Trips:6},
//   {Name: 'Johnson', ClientID: 101100111, Address: '26, ABC street, Chippendale, Sydney', Contact: '+61 7 7010 4122', Trips:6},
//   {Name: 'Johnson', ClientID: 101100111, Address: '26, ABC street, Chippendale, Sydney', Contact: '+61 7 7010 4122', Trips:6},
//   {Name: 'Johnson', ClientID: 101100111, Address: '26, ABC street, Chippendale, Sydney', Contact: '+61 7 7010 4122', Trips:6},
//   {Name: 'Johnson', ClientID: 101100111, Address: '26, ABC street, Chippendale, Sydney', Contact: '+61 7 7010 4122', Trips:6},
//   {Name: 'Johnson', ClientID: 101100111, Address: '26, ABC street, Chippendale, Sydney', Contact: '+61 7 7010 4122', Trips:6}
// ];
