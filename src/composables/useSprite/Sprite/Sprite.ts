import { ref, type Ref } from 'vue'
import { useCycleList } from '@vueuse/core'
import type { set } from 'animejs'

export abstract class Sprite {
  protected _animationNames: string[]
  protected _animations: any[]
  protected _frames: any[]
  protected _currentAnimation: Ref<any>

  constructor(type: string, name: string) {
    this._animations = []
    this._frames = []
    this._animationNames = []
    this._currentAnimation = ref(null)
  }

  protected generateCycleList() {
    const cycleAnimations = useCycleList(this._animations)
    this._currentAnimation = cycleAnimations.state
  }

  get animations() {
    return this._animations.map((a: any) => a.name)
  }

  get currentAnimation(): Ref<any> {
    return this._currentAnimation
  }

  set currentAnimation(name: string) {
    this._currentAnimation.value = this._animations.find(
      (a: any) => a.name === name
    )
  }

  play() {
    this._currentAnimation.value.play()
  }
  playOnce() {
    this._currentAnimation.value.playOnce()
  }
  pause() {
    this._currentAnimation.value.pause()
  }
  stop() {
    this._currentAnimation.value.stop()
  }
  next() {
    this._currentAnimation.value.next()
  }
  prev() {
    this._currentAnimation.value.prev()
  }
  go(i: number) {
    this._currentAnimation.value.go(i)
  }
}
