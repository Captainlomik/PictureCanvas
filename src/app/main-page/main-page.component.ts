import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsPopupComponent } from '../settings-popup/settings-popup.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  
  picture: string = ''
  currentFile!: File | null
  rangePersent!: number

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(SettingsPopupComponent, {
    });
  }

  selectFile(e: any) {
    this.currentFile = e.target!.files.item(0);
  }

  delete() {
    this.currentFile = null
    this.picture = ''
  }

}
