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
  @Input() file!: File | null
  @Input() rangePersent!: number
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
    let range = this.rangePersent / 100

    let width = this.img.width
    let height = this.img.height
    let canvasWidth = this.context!.canvas.width
    let canvasHeight = this.context!.canvas.height

    if (this.context) {
      this.size = `Ширина: ${width}px;  Высота: ${height}px`

      this.context.canvas.width= document.body.clientWidth - 100;
      this.context.canvas.height = document.body.clientHeight - 230;

      let scale = Math.min(canvasWidth / (width), canvasHeight / (height));

      range ? range : range = 1

      let x = (canvasWidth - width * scale * range) / 2;
      let y = (canvasHeight - height * scale * range) / 2;

      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // Очистка холста
      this.context.drawImage(this.img, x, y, width * scale * range, height * scale * range);

    }
  }


  getPosition(event: any) {
    let x = event.x
    let y = event.y

    let offsetPositionY = this.myCanvas.nativeElement.offsetTop + 50;
    let offsetPositionX = this.myCanvas.nativeElement.offsetLeft + 50;

    let scrollTop = (document.documentElement || document.body.parentNode || document.body).scrollTop;
    let scrollLeft = (document.documentElement || document.body.parentNode || document.body).scrollTop;

    this.getColor(x - offsetPositionX + scrollLeft, y - offsetPositionY + scrollTop)
    this.position = `x: ${Math.trunc(x - offsetPositionX + scrollLeft)}, y: ${Math.trunc(y - offsetPositionY + scrollTop)}`
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
