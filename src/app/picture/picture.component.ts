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

  constructor(public dialog: MatDialog) {}

  @Input() picture!: string
  @Input() file!: File | null
  @Input() rangePersent!: number
  @Input() personResult!: Resize | null;
  img = new Image()

  scale!: number

  position!: string
  size!: string

  colors: any
  RGB!: string
  Hex!: string

  x: number = 0
  y: number = 0

  newImg!: ImageBitmap

  ngOnInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d');
    if (this.context) {
      this.context.canvas.width = document.body.clientWidth;
      this.context.canvas.height = document.body.clientHeight - 130;
    }
   }

  ngOnChanges(_: SimpleChanges): void {
    if (!this.context) {
      return
    }

    let oldImgSrc = this.img.src

    this.file ? this.img.src = URL.createObjectURL(this.file) : this.img.src = this.picture
    this.img.crossOrigin = "Anonymous";

    this.img.onload = () => {
      if (this.img.src && oldImgSrc !== this.img.src) {
        this.rangePersent = 90
        this.scale = this.calcInitialScale()
      }

      if (this.img.src) {
        if (this.personResult) {
          console.log(this.personResult)
          let newPicWidth = this.personResult.unitValue === '%' ? (this.img.width * this.personResult.width) / 100 : this.personResult.width
          let newPicHeight = this.personResult.unitValue === '%' ? (this.img.height * this.personResult.height) / 100 : this.personResult.height
          if (this.personResult.checked) {
            let prop = Math.round(this.img.width / this.img.height)
            newPicHeight = Math.round(this.personResult.width / prop)
          }
          console.log(newPicWidth, newPicHeight)
          this.size = `Ширина: ${newPicWidth}px;  Высота: ${newPicHeight}px`
          this.newNearestNeighbor(this.context!, this.x, this.y, newPicWidth, newPicHeight)

          this.personResult = null;
        } else {
          this.drawImg(this.scale, this.rangePersent / 100)
        }
      }
    }
  }

  calcInitialScale(): number {
    let width = this.img.width
    let height = this.img.height
    if (!!this.newImg) {
      width = this.newImg.width
      height = this.newImg.height
    }

    let canvasWidth = this.context!.canvas.width
    let canvasHeight = this.context!.canvas.height


    return Math.min(canvasWidth / (width), canvasHeight / (height));
  }

  drawImg(scale: number, range: number) {
    let width = this.newImg ? this.newImg.width : this.img.width
    let height = this.newImg ? this.newImg.height : this.img.height

    let canvasWidth = this.context!.canvas.width
    let canvasHeight = this.context!.canvas.height

    if (this.context) {
      this.size = `Ширина: ${width}px;  Высота: ${height}px`

      range ? range : range = 1
      scale ? scale : scale = 1

      let x = (canvasWidth - width * scale * range) / 2;
      let y = (canvasHeight - height * scale * range) / 2;
      this.x = x
      this.y = y

      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
      if (this.newImg) {
        this.context.drawImage(this.newImg, x, y, width * scale * range, height * scale * range)
      } else {
        this.context.drawImage(this.img, x, y, width * scale * range, height * scale * range);
      }
    }
  }

  getPosition(event: any) {
    let x = event.x
    let y = event.y

    let offsetPositionY = this.myCanvas.nativeElement.offsetTop;
    let offsetPositionX = this.myCanvas.nativeElement.offsetLeft;

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

  async newNearestNeighbor(ctx: CanvasRenderingContext2D, startX: number, startY: number, width: number, height: number) {
    let w = Math.floor(this.img.width * this.scale * (this.rangePersent / 100))
    let h = Math.floor(this.img.height * this.scale * (this.rangePersent / 100))
    let oldImageData = ctx.getImageData(startX, startY, w, h)
    let oldImageArray = oldImageData.data

    let kHeight = oldImageData.height / height
    let kWidth = oldImageData.width / width

    let newImageArray = new Uint8ClampedArray(width * height * 4)
    for (let ih = 0; ih < height; ih++) {
      for (let iw = 0; iw < width; iw++) {
        let srcIndex = (Math.floor(ih * kHeight) * oldImageData.width * 4) + (Math.floor(kWidth * iw) * 4)
        const r = oldImageArray[srcIndex]
        const g = oldImageArray[srcIndex + 1]
        const b = oldImageArray[srcIndex + 2]
        const a = oldImageArray[srcIndex + 3]

        let destIndex = (ih * width * 4) + (iw * 4)
        newImageArray[destIndex] = r
        newImageArray[destIndex + 1] = g
        newImageArray[destIndex + 2] = b
        newImageArray[destIndex + 3] = a
      }
    }

    let imageData = new ImageData(newImageArray, width, height)
    await createImageBitmap(imageData).then(img => {
      this.newImg = img
    })

    this.scale = this.calcInitialScale()
    this.rangePersent = 90
    this.drawImg(this.scale, this.rangePersent / 100)
  }
}
