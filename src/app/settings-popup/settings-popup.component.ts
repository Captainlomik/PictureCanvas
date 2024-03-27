import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-popup',
  templateUrl: './settings-popup.component.html',
  styleUrl: './settings-popup.component.scss'
})
export class SettingsPopupComponent {
  unitValues = ['%', 'px']
  methods = ['']
  unit!: string
  sizeForm!:FormGroup

  constructor(public dialogRef: MatDialogRef<SettingsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.sizeForm = new FormGroup({
        "with": new FormControl(),
        "height":  new FormControl()
      })
  }

  closepopup() {
    this.dialogRef.close();
  }


}
