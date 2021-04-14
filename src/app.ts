class App {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')!

    this.context.fillStyle = 'lightblue'
    this.context.fillRect(0, 0, 500, 150)

    this.context.fillStyle = 'lightgreen'
    this.context.fillRect(0, 280, 500, 20)

    this.context.fillStyle = 'gold'
    this.context.beginPath()
    this.context.arc(180, 200, 10, 15, Math.PI * 2, true)
    this.context.arc(230, 200, 10, 15, Math.PI * 2, true)
    this.context.arc(350, 200, 10, 15, Math.PI * 2, true)
    this.context.fill()

    this.context.fillStyle = 'orange'
    this.context.fillRect(100, 230, 50, 50)

    this.context.fillStyle = 'lightgrey'
    this.context.fillRect(400, 255, 25, 25)
  }
}

const app = new App()