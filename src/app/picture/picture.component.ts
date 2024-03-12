import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {
  @ViewChild('canvas', { static: true }) myCanvas!: ElementRef<HTMLCanvasElement>
  constructor() {
  }
  // picture: string = "https://www.fonstola.ru/images/201305/fonstola.ru_96099.jpg";
  picture: string = './assets/cat.jpg'
  img = new Image(100, 100);
  x!: number
  y!: number
  position!: string

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const context = this.myCanvas.nativeElement.getContext('2d')

    if (this.picture && context) {
      this.img.src = this.picture;
      setTimeout(() => this.drawCat(context), 100);


    }
  }

  drawCat(context: CanvasRenderingContext2D) {
    context.drawImage(this.img, 0, 0)
  }

  getPosition(event: any) {
    this.x = event.x
    this.y = event.y
    this.position = `x: ${this.x}, y: ${this.y}`
  }
}
