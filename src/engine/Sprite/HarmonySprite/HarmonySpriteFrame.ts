import { SpriteFrame } from '@/engine/Sprite'

export const HARMONY_FRAME_NAME = 1
export const HARMONT_DRAWING_NUMBER = 2

export class HarmonyFrame extends SpriteFrame {
  constructor(frame: any) {
    super(frame)

    //Frame name format: "1-Walk-7.png"
    const rect = frame.$.rect.split(',')
    this._name = HarmonyFrame.getFrameName(frame)
    this._fullName = frame.$.name
    this._x = Number(rect[0])
    this._y = Number(rect[1])
    this._width = Number(rect[2])
    this._height = Number(rect[3])
    this._offsetX = Number(frame.$.offsetX)
    this._offsetY = Number(frame.$.offsetY)
    this._scaleX = Number(frame.$.scaleX)
    this._scaleY = Number(frame.$.scaleY)
  }

  static getFrameName(frame: any) {
    const nameSplit = frame.$.name.split('-')
    const frameName = nameSplit[HARMONY_FRAME_NAME]
    const drawingNumber = nameSplit[HARMONT_DRAWING_NUMBER]
    return `$${frameName}-${drawingNumber}`
  }
}
