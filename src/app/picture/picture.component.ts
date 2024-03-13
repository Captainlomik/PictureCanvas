import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})

export class PictureComponent implements OnInit {
  @ViewChild('canvas', { static: true }) myCanvas!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D | null;

  constructor() { }

  // picture: string = "https://www.fonstola.ru/images/201305/fonstola.ru_96099.jpg";
  picture: string = './assets/cat.jpg'
  img = new Image();
  x: number = 0
  y: number = 0
  width: number = 0
  height: number = 0
  position!: string

  offsetPositionY!: number
  offsetPositionX!: number

  colors: any
  RGB!: string
  Hex!: string


  ngOnInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d')

    if (this.picture && this.context) {
      this.img.src = this.picture;

      setTimeout(() => this.drawCat(), 100);
    }
  }


  drawCat() {
    this.width = this.img.width
    this.height = this.img.height
    if (this.context) {
      this.context.drawImage(this.img, 0, 0, this.img.width, this.img.height)
    }
  }

  getPosition(event: any) {
    this.x = event.x
    this.y = event.y
    this.offsetPositionY = this.myCanvas.nativeElement.offsetTop
    this.offsetPositionX = this.myCanvas.nativeElement.offsetLeft

    this.getColor(this.x - this.offsetPositionX, this.y - this.offsetPositionY)
    this.position = `x: ${this.x - this.offsetPositionX}, y: ${this.y - this.offsetPositionY}`
  }

  getColor(x: number, y: number) {
    if (this.context) {
      const [r, g, b] = this.context.getImageData(x, y, 1, 1).data;
      this.Hex = this.rgbToHex(r, g, b)
      this.RGB = `(${r}, ${g}, ${b})`
    }
  }

  rgbToHex(r: number, g: number, b: number) {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')

  }
}
