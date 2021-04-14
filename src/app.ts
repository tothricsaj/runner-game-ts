class App {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')!

    this.context.fillStyle = 'orange'
    this.context.fillRect(100, 250, 50, 50)

    this.context.fillStyle = 'lightgrey'
    this.context.fillRect(400, 275, 25, 25)
  }
}

const app = new App()