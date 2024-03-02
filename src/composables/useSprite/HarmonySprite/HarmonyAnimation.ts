import { SpriteAnimation } from '../Sprite/SpriteAnimation'
import { HarmonyFrame } from './HarmonyFrame'
const ANIMATION_NAME = 1

export class HarmonyAnimation extends SpriteAnimation {
  constructor(name: string, animation: HarmonyFrame[]) {
    super(name, animation)
  }
}
