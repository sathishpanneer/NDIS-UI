import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-driver',
  templateUrl: './delete-driver.component.html',
  styleUrls: ['./delete-driver.component.scss']
})
export class DeleteDriverComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDriverComponent>) { }

  ngOnInit() {
  }
  
  cancel() {
    this.dialogRef.close();
  }

}
