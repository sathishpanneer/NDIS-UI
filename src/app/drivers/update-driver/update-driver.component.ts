import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Driver } from 'src/app/Shared/Models/Driver.model';

@Component({
  selector: 'app-update-driver',
  templateUrl: './update-driver.component.html',
  styleUrls: ['./update-driver.component.scss']
})
export class UpdateDriverComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Driver,
    public dialogRef: MatDialogRef<UpdateDriverComponent>
  ) { }

  ngOnInit() {
    
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      '';
  }

  cancel() {
    this.dialogRef.close();
  }

}
