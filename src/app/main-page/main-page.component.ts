import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  picture: string = ''
  img = new Image()

  getImg() {
    this.img.src = this.picture;
    this.img.crossOrigin = "Anonymous";
  }

}
