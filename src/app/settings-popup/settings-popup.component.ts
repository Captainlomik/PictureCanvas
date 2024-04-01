import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-popup',
  templateUrl: './settings-popup.component.html',
  styleUrl: './settings-popup.component.scss'
})
export class SettingsPopupComponent {
  unitValues = ['%', 'px']
  unit!: string
  sizeForm!: FormGroup

  unitValue!: string
  width!: number
  height!: number
  checked!: boolean
  alghoritm!: string



  constructor(public dialogRef: MatDialogRef<SettingsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    // this.sizeForm = new FormGroup({
    //   "unit": new FormControl(),
    //   "width": new FormControl(),
    //   "height": new FormControl(),
    //   "checked": new FormControl(),
    //   "algorithm": new FormControl()
    // })
  }

  closepopup() {
    this.dialogRef.close();
  }

  submitForm(form: NgForm) {
   this.dialogRef.close()
   this.data = form
  }

}
