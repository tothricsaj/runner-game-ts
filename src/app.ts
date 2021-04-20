import GameObject from './GameObject'

class Game {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  private animationFrame: any

  private running: boolean

  private enemyCoorX: number
  private enemyCoorY: number

  private playerCoorX: number
  private playerCoorY: number

  private enemy: GameObject
  private player: GameObject

  private objectCoors: any

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')!

    this.running = false

    this.enemyCoorX = 470
    this.enemyCoorY = 255

    this.playerCoorX = 100
    this.playerCoorY = 230

    this.objectCoors = {
      enemy: {
        x: 470,
        y: 255,
        width: 25,
        height: 25,
        fillStyle: 'lightgrey'
      },
      player: {
        x: 100,
        y: 230,
        width: 50,
        height: 50,
        fillStyle: 'orange'
      }
    }

    this.enemy = new GameObject({
        x: this.objectCoors.enemy.x,
        y: this.objectCoors.enemy.y,
        width: 25,
        height: 25,
        fillStyle: 'lightgrey'
      },
      this.context
    )

    this.player = new GameObject({
        x: this.objectCoors.player.x,
        y: this.objectCoors.player.y,
        width: 50,
        height: 50,
        fillStyle: 'orange'
      },
      this.context
    )
  }

  start() {
    if(!this.running) {
      this.animationFrame = window.requestAnimationFrame(() => this.animate(this.context))
      this.running = true
    }
  }

  stop() {
    window.cancelAnimationFrame(this.animationFrame)
    this.running = false
  }

  animate(ctx: CanvasRenderingContext2D): void {
    if(this.running) {
      ctx.save()

      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, 500, 300)

      if(this.objectCoors.enemy.x <= -25) {
        // this.enemyCoorX = 500
        this.objectCoors.enemy.x = 500
      } else {
        // this.enemyCoorX -= 5
        this.objectCoors.enemy.x -= 5
      }


      this.enemy.draw(this.objectCoors.enemy.x, this.objectCoors.enemy.y)
      this.player.draw()

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

      ctx.restore()

      window.requestAnimationFrame(() => this.animate(ctx))

      this.collosion()
    }
  }

  collosion() {
    const player = this.objectCoors.player
    const enemy = this.objectCoors.enemy

    if(
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
     
    ) {
      this.stop()
    }
  }
}

const app = new Game()

document.querySelector('.start')?.addEventListener('click', _ => {
  app.start()
})

document.querySelector('.stop')?.addEventListener('click', _ => {
  app.stop()
})