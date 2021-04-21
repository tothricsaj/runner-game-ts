import GameObjectDimension from './GameObjectDimesionInterface'

class GameObject {

  constructor(
    protected dim: GameObjectDimension,
    protected ctx: CanvasRenderingContext2D
  ) {}

  draw(x?: number, y?: number) {
    const ctx = this.ctx

    if(this.dim.fillStyle) {
      ctx.fillStyle = this.dim.fillStyle
    }

    if(!!x && !!y) {
      ctx.fillRect(
        x,
        y,
        this.dim.width,
        this.dim.height
      )
    } else {
      ctx.fillRect(
        this.dim.x,
        this.dim.y,
        this.dim.width,
        this.dim.height
      )
    }

  }

}

export default GameObject