import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Trip } from 'src/app/Shared/Models/Trip.model';

@Component({
  selector: 'app-update-trip',
  templateUrl: './update-trip.component.html',
  styleUrls: ['./update-trip.component.scss']
})
export class UpdateTripComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : Trip,
    public dialogRef: MatDialogRef<UpdateTripComponent>,
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
