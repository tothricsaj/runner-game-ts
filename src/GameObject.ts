interface GameObjectDimension {
  x: number,
  y: number,
  width: number,
  height: number,
  fillStyle?: string
}

class GameObject {

  constructor(
    private dim: GameObjectDimension,
    private ctx: CanvasRenderingContext2D
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