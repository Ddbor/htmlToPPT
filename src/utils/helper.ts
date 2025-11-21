import { getChildRelativeToParent } from './element'

export let helperClassName = 'html-to-ppt-helper'
export let hoverBoxClassName = 'html-to-ppt-hover-box'

const getHelperElement = (boundaryElement: Element) => {
  return boundaryElement.querySelector(`.${helperClassName}`) as HTMLElement
}

const getHoverBoxElement = (boundaryElement: Element) => {
  return boundaryElement.querySelector(`.${hoverBoxClassName}`) as HTMLElement
}

const createHelperElement = (className: string) => {
  const helperElement = document.createElement('div')
  helperElement.classList.add(className)
  helperElement.style.position = 'absolute'
  helperElement.style.left = '0'
  helperElement.style.top = '0'
  helperElement.style.zIndex = '9999'
  helperElement.style.pointerEvents = 'none'

  return helperElement
}

/**
 * 插入helper元素
 * @param boundaryElement 边界元素
 * @returns helper元素
 */
export const appendHelperElement = (boundaryElement: Element) => {
  /**
   * 销毁
   */
  getHelperElement(boundaryElement)?.remove()
  getHoverBoxElement(boundaryElement)?.remove()

  const position = getComputedStyle(boundaryElement).getPropertyValue('position')

  if (!['relative', 'absolute', 'fixed', 'sticky'].includes(position)) {
    ;(boundaryElement as HTMLElement).style.position = 'relative'
  }

  const helperElement = createHelperElement(helperClassName)
  const hoverBoxElement = createHelperElement(hoverBoxClassName)

  boundaryElement.appendChild(helperElement)
  boundaryElement.appendChild(hoverBoxElement)
}

/**
 * 取消hoverBox样式
 */
export const deactivateHoverBoxStyle = (boundaryElement: Element) => {
  const hoverBoxElement = getHoverBoxElement(boundaryElement)
  if (hoverBoxElement) {
    hoverBoxElement.style.border = 'none'
  }
}

/**
 * 更新hoverBox位置、大小
 */
export const updateHoverBoxStyle = (boundaryElement: Element, moveElement: HTMLElement) => {
  const hoverBoxElement = getHoverBoxElement(boundaryElement)

  if (hoverBoxElement) {
    const { left, top, width, height } = getChildRelativeToParent(
      moveElement,
      boundaryElement as HTMLElement
    )
    hoverBoxElement.style.left = `${left}px`
    hoverBoxElement.style.top = `${top}px`
    hoverBoxElement.style.width = `${width}px`
    hoverBoxElement.style.height = `${height}px`
    hoverBoxElement.style.border = '1px dashed rgb(100,100,255)'
  }
}

/**
 * 取消helper样式
 */
export const deactivateHelperStyle = (boundaryElement: Element) => {
  const helperElement = getHelperElement(boundaryElement)
  if (helperElement) {
    helperElement.style.border = 'none'
  }
}

/**
 * 更新helper位置、大小
 */
export const updateHelperStyle = (boundaryElement: Element, moveElement: HTMLElement) => {
  const helperElement = getHelperElement(boundaryElement)

  if (helperElement) {
    const { left, top, width, height } = getChildRelativeToParent(
      moveElement,
      boundaryElement as HTMLElement
    )
    helperElement.style.left = `${left}px`
    helperElement.style.top = `${top}px`
    helperElement.style.width = `${width}px`
    helperElement.style.height = `${height}px`
    helperElement.style.border = '1px solid rgb(100,100,255)'
  }
}
