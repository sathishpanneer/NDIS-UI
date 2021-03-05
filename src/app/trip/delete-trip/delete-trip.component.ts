import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-trip',
  templateUrl: './delete-trip.component.html',
  styleUrls: ['./delete-trip.component.scss']
})
export class DeleteTripComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteTripComponent>) { }

  ngOnInit() {
  }
  
  cancel() {
    this.dialogRef.close();
  }

}
