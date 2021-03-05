import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-trip-type',
  templateUrl: './delete-trip-type.component.html',
  styleUrls: ['./delete-trip-type.component.scss']
})
export class DeleteTripTypeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteTripTypeComponent>) { }

  ngOnInit() {
  }
  
  cancel() {
    this.dialogRef.close();
  }

}
