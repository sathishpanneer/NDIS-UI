import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-cost-centre',
  templateUrl: './delete-cost-centre.component.html',
  styleUrls: ['./delete-cost-centre.component.scss']
})
export class DeleteCostCentreComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteCostCentreComponent>) { }

  ngOnInit() {
  }
  
  cancel() {
    this.dialogRef.close();
  }

}
