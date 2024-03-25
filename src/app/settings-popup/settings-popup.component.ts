import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-popup',
  templateUrl: './settings-popup.component.html',
  styleUrl: './settings-popup.component.scss'
})
export class SettingsPopupComponent {
  unitValues = ['%', 'px']
  unit!: string

  constructor(public dialogRef: MatDialogRef<SettingsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  closepopup() {
    this.dialogRef.close();
  }


}
