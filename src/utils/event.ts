import {
  deactivateHelperStyle,
  deactivateHoverBoxStyle,
  updateHelperStyle,
  updateHoverBoxStyle,
} from './helper'
import { interactStart } from './interact'

// 容器元素
let container: HTMLElement = document.body
// 鼠标移动到的元素
let moveElement: HTMLElement | null = null
// 点击的元素
let clickElement: HTMLElement | null = null
// 当前可编辑元素
let contenteditableElement: HTMLElement | null = null
// 保存的可编辑元素
let saveContenteditableElement: HTMLElement | null = null
// 可交互
let interactable: { unset: () => void } | null = null

/**
 * 输入事件
 */
const handleInputEvent = () => {
  if (contenteditableElement) {
    updateHelperStyle(container, contenteditableElement)
    updateHoverBoxStyle(container, contenteditableElement)
  }
}

/**
 * 鼠标移动事件
 */
const mouseMoveEvent = (e: Event) => {
  const target = e.target as HTMLElement

  if (target === container) {
    moveElement = null
    deactivateHoverBoxStyle(container)
    return
  }

  moveElement = target

  updateHoverBoxStyle(container, moveElement)
}

/**
 * 点击事件
 */
const handleClickEvent = (e: Event) => {
  const target = e.target as HTMLElement

  interactable?.unset()

  /**
   * 点击非可编辑元素时，取消当前可编辑元素的编辑状态
   */
  if (target !== contenteditableElement) {
    if (contenteditableElement) {
      contenteditableElement.removeAttribute('contenteditable')
      contenteditableElement.removeEventListener('input', handleInputEvent)

      if (saveContenteditableElement) {
        const outline = getComputedStyle(saveContenteditableElement).outline
        contenteditableElement.style.outline = outline
      }
    }
    contenteditableElement = null
  }

  /**
   * 点击容器时，取消当前点击元素的状态
   */
  if (target === container) {
    clickElement = null
    deactivateHelperStyle(container)
    return
  }

  clickElement = target

  updateHelperStyle(container, clickElement)

  interactable = interactStart(clickElement, {
    onMove: () => {
      updateHelperStyle(container, clickElement!)
    },
    onResize: () => {
      updateHelperStyle(container, clickElement!)
    },
  })
}

/**
 * 双击事件
 */
const handleDoubleClickEvent = (e: Event) => {
  const target = e.target as HTMLElement

  if (target === container) {
    return
  }

  if (target.contentEditable === 'true') {
    return
  }

  contenteditableElement = target
  saveContenteditableElement = target.cloneNode(false) as HTMLElement

  target.setAttribute('contenteditable', 'true')
  target.style.setProperty('outline', 'none', 'important')

  target.addEventListener('input', handleInputEvent)
}

/**
 * 解绑事件
 */
const unbindEvent = () => {
  if (!container) {
    return
  }

  container.removeEventListener('mousemove', mouseMoveEvent)

  container.removeEventListener('click', handleClickEvent)

  container.removeEventListener('dblclick', handleDoubleClickEvent)
}

/**
 * 绑定事件
 * @param container 容器元素
 */
export const bindEvent = (boundaryElement: Element) => {
  /**
   * 解绑事件
   */
  container = boundaryElement as HTMLElement
  moveElement = null
  unbindEvent()

  container.addEventListener('mousemove', mouseMoveEvent)

  container.addEventListener('click', handleClickEvent)

  container.addEventListener('dblclick', handleDoubleClickEvent)
}
