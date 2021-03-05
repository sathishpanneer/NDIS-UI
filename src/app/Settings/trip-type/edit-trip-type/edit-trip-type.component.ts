import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TripTypes } from 'src/app/Shared/Models/TripTypes.model';

@Component({
  selector: 'app-edit-trip-type',
  templateUrl: './edit-trip-type.component.html',
  styleUrls: ['./edit-trip-type.component.scss']
})
export class EditTripTypeComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : TripTypes,
    public dialogRef: MatDialogRef<EditTripTypeComponent>,
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
