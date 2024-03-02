export abstract class SpriteFrame {
  protected _x: number
  protected _y: number
  protected _width: number
  protected _height: number
  protected _offsetX: number
  protected _offsetY: number
  protected _scaleX: number
  protected _scaleY: number
  protected _name: string
  protected _fullName: string

  constructor(frame: any) {
    this._x = 0
    this._y = 0
    this._width = 0
    this._height = 0
    this._offsetX = 0
    this._offsetY = 0
    this._scaleX = 0
    this._scaleY = 0
    this._name = ''
    this._fullName = ''
  }

  get name() {
    return this._name
  }
  get fullName() {
    return this._fullName
  }
  get x() {
    return this._x
  }
  get y() {
    return this._y
  }
  get width() {
    return this._width
  }
  get height() {
    return this._height
  }
  get offsetX() {
    return this._offsetX
  }
  get offsetY() {
    return this._offsetY
  }
  get scaleX() {
    return this._scaleX
  }
  get scaleY() {
    return this._scaleY
  }
}
