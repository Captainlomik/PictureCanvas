import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsPopupComponent } from '../settings-popup/settings-popup.component';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})

export class PictureComponent implements OnInit, OnChanges {
  @ViewChild('canvas', { static: true }) myCanvas!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D | null;

  constructor(public dialog: MatDialog) { }

  @Input() picture!: string
  @Input() file!: File
  img = new Image()


  position!: string
  size!: string

  colors: any
  RGB!: string
  Hex!: string


  ngOnInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d')
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.file ? this.img.src = URL.createObjectURL(this.file) : this.img.src = this.picture
    this.img.crossOrigin = "Anonymous";

    if (this.img.src) {
      setTimeout(() => this.drawImg(), 1000);
    }
  }

  drawImg() {
    let width = this.img.width
    let height = this.img.height

    if (this.context) {
      this.size = `Ширина: ${width}px;  Высота: ${height}px`

      this.context.canvas.width = width
      this.context.canvas.height = height
      this.context.drawImage(this.img, 0, 0, width, height)
    }
  }

  getPosition(event: any) {
    let x = event.x
    let y = event.y
    let offsetPositionY = this.myCanvas.nativeElement.offsetTop || document.documentElement.scrollTop;
    let offsetPositionX = this.myCanvas.nativeElement.offsetLeft || document.documentElement.scrollLeft;

    this.getColor(x + offsetPositionX, y + offsetPositionY)
    this.position = `x: ${Math.trunc(x + offsetPositionX)}, y: ${Math.trunc(y + offsetPositionY)}`
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
