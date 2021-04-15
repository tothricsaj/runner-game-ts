interface GameObjectDimension {
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  fillStyle?: string
}

class GameObject {

  constructor(
    private dim: GameObjectDimension
  ) {}

  // TODO(tothricsaj): make x and y choosable and handle it
  draw(x: number, y: number) {
    const ctx = this.dim.ctx

    if(this.dim.fillStyle) {
      ctx.fillStyle = this.dim.fillStyle
    }

    ctx.fillRect(
      x,
      y,
      this.dim.width,
      this.dim.height
    )
  }

}

export default GameObject