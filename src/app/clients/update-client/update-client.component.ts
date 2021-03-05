import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { client } from 'src/app/Shared/Models/client.model';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: client,
    public dialogRef: MatDialogRef<UpdateClientComponent>
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
