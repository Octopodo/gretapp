export abstract class Sprite {
  protected _animationNames: string[]
  protected _animations: any[]
  protected _frames: any[]
  protected _currentAnimation: any
  protected _maxHeight: number
  protected _maxWidth: number

  constructor() {
    this._animations = []
    this._frames = []
    this._animationNames = []
    this._currentAnimation = {}
    this._maxHeight = 0
  }

  get animations() {
    return this._animations.map((a: any) => a.name)
  }

  get currentAnimation(): any {
    return this._currentAnimation
  }

  get maxHeight() {
    return Math.max(...this._frames.map((f: any) => f.height))
  }

  get maxWidth() {
    return Math.max(...this._frames.map((f: any) => f.width))
  }

  set currentAnimation(name: string) {
    const animationIndex = this._animations.findIndex((a: any) => {
      return a.name === name
    })
    if (animationIndex !== -1) {
      this._currentAnimation = this._animations[animationIndex]
      const stop = 0
    }
  }

  play() {
    this._currentAnimation.play()
  }
  playOnce() {
    return this._currentAnimation.playOnce()
  }
  pause() {
    this._currentAnimation.pause()
  }
  stop() {
    this._currentAnimation.stop()
  }
  next() {
    this._currentAnimation.next()
  }
  prev() {
    this._currentAnimation.prev()
  }
  go(i: number) {
    this._currentAnimation.go(i)
  }
}
