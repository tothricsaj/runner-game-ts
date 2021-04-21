import GameObjectDimension from './GameObjectDimesionInterface'
import GameObject from './GameObject'

class CoinGameObject extends GameObject {

  constructor(
    dim: GameObjectDimension,
    ctx: CanvasRenderingContext2D
  ) {
    super(dim, ctx)
  }
  draw(x?: number, y?: number) {
    this.ctx.fillStyle = 'gold'

    this.ctx.beginPath()

    if(!!x && !!y) {
      this.ctx.arc(
        x,
        y,
        this.dim.width,
        this.dim.height,
        Math.PI * 2,
        true
      )
    } else {
      this.ctx.arc(
        this.dim.x,
        this.dim.y,
        this.dim.width,
        this.dim.height,
        Math.PI * 2,
        true
      )
    }


    this.ctx.fill()
  }
}

export default CoinGameObject