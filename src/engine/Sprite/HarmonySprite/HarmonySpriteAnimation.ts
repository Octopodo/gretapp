import { SpriteAnimation } from '@/engine/Sprite'
import { HarmonyFrame } from './HarmonySpriteFrame'
const ANIMATION_NAME = 1

export class HarmonyAnimation extends SpriteAnimation {
  constructor(name: string, animation: HarmonyFrame[]) {
    super(name, animation)
  }
}
