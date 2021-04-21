import GameObject from './GameObject'
import CoinGameObject from './CoinGameObject'

class Game {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  private animationFrame: any

  private running: boolean

  private enemyAttackPeriod = true
  private coinOnBord = true

  private enemy: GameObject
  private player: GameObject
  private coin: CoinGameObject

  private gravityVel = -3

  private plyarXCoorMove = 0

  // TODO(tothricsaj): objectCoors is already not nessecery. Do refactor!
  private objectCoors: any
  private gravity: any

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.context = this.canvas.getContext('2d')!

    this.running = false

    this.objectCoors = {
      enemy: {
        x: 470,
        y: 255,
        width: 10,
        height: 25,
        fillStyle: 'lightgrey'
      },
      player: {
        x: 100,
        y: 230,
        width: 25,
        height: 50,
        fillStyle: 'orange'
      },
      coin: {
        x: 550,
        y: 200,
        width: 10,
        height: 15,
        fillStyle: 'gold'
      }
    }

    this.gravity = {
      downSide: false
    }

    this.enemy = new GameObject({
      x: this.objectCoors.enemy.x,
      y: this.objectCoors.enemy.y,
      width: this.objectCoors.enemy.width,
      height: this.objectCoors.enemy.height,
      fillStyle: 'lightgrey'
      },
      this.context
    )

    this.player = new GameObject({
      x: this.objectCoors.player.x,
      y: this.objectCoors.player.y,
      width: this.objectCoors.player.width,
      height: this.objectCoors.player.height,
      fillStyle: 'orange'
      },
      this.context
    )

    this.coin = new CoinGameObject({
      x: this.objectCoors.coin.x,
      y: this.objectCoors.coin.y,
      width: this.objectCoors.coin.width,
      height: this.objectCoors.coin.height,
      fillStyle: 'gold'
      },
      this.context
    )

    this.drawStaticObjects()

    document.addEventListener('keydown', () => this.keyDownHandler(event), false)
    document.addEventListener('keyup', () => this.keyUpHandler(event), false)
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
    const player = this.objectCoors.player
    const enemy = this.objectCoors.enemy
    const coin = this.objectCoors.coin

    if(this.running) {
      ctx.save()

      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, 500, 300)

      // enemy animation
      if(Math.ceil(Math.random() * 100) > 97 && enemy.x > -25) {
        console.log("enemy is attacking")
        this.enemyAttackPeriod = true
      }

      if(enemy.x <= -25) {
        enemy.x = 550
        this.enemyAttackPeriod = false
      }

      if(this.enemyAttackPeriod)
          enemy.x -= 4

      this.enemy.draw(enemy.x, enemy.y)

      ////////////////////////////////////////////////////////////

      // coin ////////////////////////////////////////////////////
      if(Math.ceil(Math.random() * 100) > 99 && coin.x > -25) {
        console.log("enemy is attacking")
        this.coinOnBord = true
      }

      if(coin.x <= -25) {
        coin.x = 550
        this.coinOnBord = false
      }

      if(this.coinOnBord)
          coin.x -= 2

      this.coin.draw(coin.x, coin.y)

      ////////////////////////////////////////////////////////////

      // gravity /////////////////////////////////////////////////
      if((player.y > 230 || player.y < 190) && this.gravity.downSide) {
        this.gravityVel = -this.gravityVel
      }

      if(this.gravity.downSide) {
        player.y += this.gravityVel

        if(player.y >= 230) {
          this.gravity.downSide = false
          this.gravityVel = -3
        }
      }
      ////////////////////////////////////////////////////////////

      console.log(player.x)
      if(player.x > 450 || player.x < 20) {
        this.plyarXCoorMove = 0
      }

      if(player.x < 20)
        player.x = player.x + 3

      if(player.x > 450) {
        player.x = player.x - 3
      }

      player.x += this.plyarXCoorMove

      this.player.draw(player.x, player.y)

      this.drawStaticObjects()

      ctx.restore()

      window.requestAnimationFrame(() => this.animate(ctx))

      this.collosion()
    }
  }

  collosion() {
    const player = this.objectCoors.player
    const enemy = this.objectCoors.enemy

    if(
      player.x <= enemy.x + enemy.width &&
      player.x + player.width >= enemy.x &&
      player.y <= enemy.y + enemy.height &&
      player.y + player.height >= enemy.y
     
    ) {
      this.stop()
    }
  }

  drawStaticObjects(): void {
    let coin = this.objectCoors.coin
    // sky
    this.context.fillStyle = 'lightblue'
    this.context.fillRect(0, 0, 500, 150)

    // grass
    this.context.fillStyle = 'lightgreen'
    this.context.fillRect(0, 280, 500, 20)

    // coins
    // this.context.fillStyle = 'gold'
    // this.context.beginPath()
    // this.context.arc(370, 200, 10, 15, Math.PI * 2, true)
    // this.context.fill()
  }

  keyDownHandler(e: any) {

    const player = this.objectCoors.player

    let playerVel = 3

    // console.log(e.keyCode)
    if(e.keyCode === 38) {
      this.gravity.downSide = true
    } else if(e.keyCode === 39 && player.x < 450) {
      this.plyarXCoorMove = playerVel
    } else if(e.keyCode === 37 && player.x > 20) {
      this.plyarXCoorMove = -playerVel
    } else if(e.keyCode === 32) {
      this.start()
    }
  }

  keyUpHandler(e: any) {
    if(e.keyCode === 39 || e.keyCode === 37) {
      this.plyarXCoorMove = 0
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