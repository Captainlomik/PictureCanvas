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

  picture!: string
  img = new Image();

  position!: string
  size!: string

  colors: any
  RGB!: string
  Hex!: string


  ngOnInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d')
  }

  getImg() {
    this.img.src = this.picture;
    this.img.crossOrigin = "Anonymous";

    if (this.img.src) {
      setTimeout(() => this.drawImg(), 1000);
    }
  }

  drawImg() {
    let width = this.img.width
    let height = this.img.height

    if (this.context) {
      this.size = `Ширина: ${width}; Длина: ${height}`

      this.context.canvas.width = 300 * width / height
      this.context.canvas.height = 300
      this.context.drawImage(this.img, 0, 0, 300 * width / height, 300)
    }
  }

  getPosition(event: any) {
    let x = event.x
    let y = event.y
    let offsetPositionY = this.myCanvas.nativeElement.offsetTop
    let offsetPositionX = this.myCanvas.nativeElement.offsetLeft

    this.getColor(x - offsetPositionX, y - offsetPositionY)
    this.position = `x: ${x - offsetPositionX}, y: ${y - offsetPositionY}`
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
