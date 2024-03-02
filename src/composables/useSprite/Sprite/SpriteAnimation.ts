import { useCycleList } from '@vueuse/core'
import type { Ref } from 'vue'

export abstract class SpriteAnimation {
  protected _name: string
  protected _frameRate: number
  protected _currentFrame: Ref<unknown>
  protected _currentFrameIndex: Ref<number>
  protected _numberOfFrames: number
  private _interval: NodeJS.Timeout
  private _fpsInSecs: number
  next: () => void
  prev: () => void
  go: (i: number) => void

  constructor(name: string, frames: unknown[]) {
    const frameList = useCycleList(frames)
    const nameSplit = name.split('-')
    nameSplit.shift()
    this._name = nameSplit.join('-')
    this._frameRate = 12
    this._numberOfFrames = frames.length
    this._currentFrame = frameList.state
    this._fpsInSecs = 1000 / this._frameRate
    this._currentFrameIndex = frameList.index
    this._interval = setInterval(() => {}, this._fpsInSecs)
    this.next = frameList.next
    this.prev = frameList.prev
    this.go = frameList.go
  }

  get name() {
    return this._name
  }
  get frameRate() {
    return this._frameRate
  }

  get currentFrame() {
    return this._currentFrame
  }
  set frameRate(frameRate: number) {
    this._frameRate = frameRate
  }

  play() {
    this._interval = setInterval(() => {
      console.log('playing', this._currentFrameIndex.value)
      this.next()
    }, this._fpsInSecs)
  }

  playOnce() {
    this._interval = setInterval(() => {
      this.next()
      if (this._currentFrameIndex.value === this._numberOfFrames - 1) {
        this.stop()
      }
    }, this._fpsInSecs)
  }

  stop() {
    clearInterval(this._interval)
  }
}
