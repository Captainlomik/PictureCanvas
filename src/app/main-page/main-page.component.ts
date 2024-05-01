import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsPopupComponent } from '../settings-popup/settings-popup.component';
import { Resize } from '../interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  picture: string = ''
  currentFile!: File | null
  rangePersent: number = 90

  personResult!: Resize

  constructor(public dialog: MatDialog) {}

  openDialog(info: string): void {
    const dialogRef = this.dialog.open(SettingsPopupComponent, {
      data: info
    });

    dialogRef.afterClosed().subscribe(result => {
      this.personResult = result
    })
  }

  selectFile(e: any) {
    this.currentFile = e.target!.files.item(0);
  }

  delete() {
    this.currentFile = null
    this.picture = ''
    this.rangePersent = 90
  }

}
