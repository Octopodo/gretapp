import * as Sprites from '@/data/sprites/'
import { ref } from 'vue'
import { Sprite } from '../Sprite'
import { HarmonyFrame } from './HarmonyFrame'
import { HarmonyAnimation } from './HarmonyAnimation'
interface SpriteFrame {
  x: number
  y: number
  width: number
  height: number
  offsetX: number
  offsetY: number
  scaleX: number
  scaleY: number
}

interface SpriteAnimation {
  name: string
  frames: SpriteFrame[]
  frameRate: number
}

export class HarmonySprite extends Sprite {
  constructor(type: string, name: string) {
    super(type, name)
    const spriteType = type as keyof typeof Sprites
    const spriteName = name as keyof (typeof Sprites)[typeof spriteType]
    const sprite = Sprites[spriteType][spriteName]
    this._frames = this.generateFrames(
      //At the moment we only have one spritesheet.
      //In the future, maybe we will have to iterate over all the spritesheets.
      sprite.frames.spritesheets.spritesheet[0].sprite
    )
    this._animations = this.generateAnimations(
      sprite.animations.drawingAnimations.drawingAnimation[0].drawing
    )

    this._currentAnimation = this._animations[0]
    const stop = 0
  }

  private generateFrames(frames: any[]) {
    const harmonyFrames = frames.map((frame: any) => {
      return new HarmonyFrame(frame)
    })
    return harmonyFrames
  }

  private getFrameByName(name: string) {
    return this._frames.find((frame: HarmonyFrame) => frame.name === name)
  }

  private generateAnimations(animations: any[]) {
    return animations.map((animation: any) => {
      const animationFrames = animation.drw.map((frame: any) => {
        const name = HarmonyFrame.getFrameName(frame)
        return this.getFrameByName(name)
      })

      return new HarmonyAnimation(animation.$.name, animationFrames)
    })
  }
}
