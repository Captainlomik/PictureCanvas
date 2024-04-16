import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';;
import { Resize } from '../interface';

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
  @Input() personResult!: Resize
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
      setTimeout(() => this.drawImg(0, 0), 1000);
    }

    if(this.rangePersent){
      this.scaleImg()
    }

  }

  drawImg(scale: number, range: number) {
    let width = this.img.width
    let height = this.img.height
    
    let canvasWidth = this.context!.canvas.width
    let canvasHeight = this.context!.canvas.height

    if (this.context) {
      this.size = `Ширина: ${width}px;  Высота: ${height}px`

      range ? range : range = 1
      scale ? scale : scale = 1

      let x = (canvasWidth - width * scale * range) / 2;
      let y = (canvasHeight - height * scale * range) / 2;

      this.context.canvas.width = document.body.clientWidth - 100;
      this.context.canvas.height = document.body.clientHeight - 230;

      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // Очистка холста
      this.context.drawImage(this.img, x, y, width * scale * range, height * scale * range);

    }
  }

  scaleImg() {
    let width = this.img.width
    let height = this.img.height
    let canvasWidth = this.context!.canvas.width
    let canvasHeight = this.context!.canvas.height

    let range = this.rangePersent / 100

    let scale = Math.min(canvasWidth / (width), canvasHeight / (height));

    this.drawImg(scale, range)
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


  ResizeNearestNeighbor() {
    let srcImageData = this.context?.getImageData(0, 0, this.img.width, this.img.height)
    let width = 500
    let height = 500
    var srcPixels = srcImageData!.data,
      srcWidth = srcImageData!.width,
      srcHeight = srcImageData!.height,
      srcLength = srcPixels.length,
      dstImageData = this.context!.createImageData(width, height),
      dstPixels = dstImageData.data;

    var xFactor = srcWidth / width,
      yFactor = srcHeight / height,
      dstIndex = 0, srcIndex,
      x, y, offset;

    for (y = 0; y < height; y += 1) {
      offset = ((y * yFactor) | 0) * srcWidth;

      for (x = 0; x < width; x += 1) {
        srcIndex = (offset + x * xFactor) << 2;

        dstPixels[dstIndex] = srcPixels[srcIndex];
        dstPixels[dstIndex + 1] = srcPixels[srcIndex + 1];
        dstPixels[dstIndex + 2] = srcPixels[srcIndex + 2];
        dstPixels[dstIndex + 3] = srcPixels[srcIndex + 3];
        dstIndex += 4;
      }
    }
    this.context!.clearRect(0, 0, this.context!.canvas.width, this.context!.canvas.height);
    this.context?.putImageData(dstImageData, 0, 0)
    return dstImageData;
  };



}
