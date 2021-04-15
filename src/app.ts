import GameObject from './GameObject'

class Game {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private enemyCoorX: number
  private enemyCoorY: number

  private enemy: GameObject

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')!

    this.enemyCoorX = 470
    this.enemyCoorY = 255

    this.enemy = new GameObject({
      ctx: this.context,
      x: this.enemyCoorX,
      y: this.enemyCoorY,
      width: 25,
      height: 25,
      fillStyle: 'lightgrey'
    })

    window.requestAnimationFrame(() => this.animate(this.context))
  }

  animate(ctx: CanvasRenderingContext2D) {
    ctx.save()

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, 500, 300)

    if(this.enemyCoorX <= -25) {
      this.enemyCoorX = 500
    } else {
      this.enemyCoorX -= 5
    }

    // enemy
    // ctx.fillStyle = 'lightgrey'
    // ctx.fillRect(this.enemyCoorX, this.enemyCoorY, 25, 25)

    this.enemy.draw(this.enemyCoorX, this.enemyCoorY)

    // sky
    this.context.fillStyle = 'lightblue'
    this.context.fillRect(0, 0, 500, 150)

    // grass
    this.context.fillStyle = 'lightgreen'
    this.context.fillRect(0, 280, 500, 20)

    // coins
    this.context.fillStyle = 'gold'
    this.context.beginPath()
    this.context.arc(180, 200, 10, 15, Math.PI * 2, true)
    this.context.arc(230, 200, 10, 15, Math.PI * 2, true)
    this.context.arc(350, 200, 10, 15, Math.PI * 2, true)
    this.context.fill()

    // player
    this.context.fillStyle = 'orange'
    this.context.fillRect(100, 230, 50, 50)

    ctx.restore()

    window.requestAnimationFrame(() => this.animate(ctx))
  }

  foo() {console.log('foo')}
}

const app = new Game()