import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsPopupComponent } from '../settings-popup/settings-popup.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  picture: string = ''

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(SettingsPopupComponent, {
    });
  }

}
