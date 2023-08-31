import React from 'react'
import EmojiPicker from "emoji-picker-react"
import { EmojiIcon } from '../../../svg'

export default function EmojiPickerApp() {
  return (
    <li>
        <button className='btn' type='button'>
            <EmojiIcon className={"dark:fill-dark_svg_1"}/>
        </button>
        <div className='openEmojiAnimation absolute bottom-[60px] left-[-0.5px]'>
        <EmojiPicker theme='dark'/>
        </div>
    </li>
  )
}
