import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CostCentre } from 'src/app/Shared/Models/CostCentre.model';

@Component({
  selector: 'app-add-cost-centre',
  templateUrl: './add-cost-centre.component.html',
  styleUrls: ['./add-cost-centre.component.scss']
})
export class AddCostCentreComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : CostCentre,
    public dialogRef: MatDialogRef<AddCostCentreComponent>,
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
