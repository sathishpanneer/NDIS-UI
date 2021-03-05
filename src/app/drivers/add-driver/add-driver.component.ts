import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Driver } from 'src/app/Shared/Models/Driver.model';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : Driver,
    public dialogRef: MatDialogRef<AddDriverComponent>,
    private snackBar: MatSnackBar
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

  cancel(){
    this.dialogRef.close();
  }

}
