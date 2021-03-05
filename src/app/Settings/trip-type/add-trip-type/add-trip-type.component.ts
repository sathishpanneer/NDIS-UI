import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TripTypes } from 'src/app/Shared/Models/TripTypes.model';

@Component({
  selector: 'app-add-trip-type',
  templateUrl: './add-trip-type.component.html',
  styleUrls: ['./add-trip-type.component.scss']
})
export class AddTripTypeComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : TripTypes,
    public dialogRef: MatDialogRef<AddTripTypeComponent>,
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
