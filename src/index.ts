import { appendHelperElement } from './utils/helper'
import { bindEvent } from './utils/event'
import { getElement } from './utils/element'
import { generateSlideNodes } from './utils/exportPPT'

interface EditOptions {
  /**
   * 边界元素 | 边界元素选择器
   * 边界元素以内可编辑
   */
  boundary?: string | Element
}

const edit = (options?: EditOptions) => {
  const { boundary } = options || {}

  /**
   * 边界元素
   */
  const boundaryElement: Element = boundary ? getElement(boundary) : document.body

  if (!boundaryElement) {
    return
  }

  /**
   * 插入helper元素
   */
  appendHelperElement(boundaryElement)

  /**
   * 绑定事件
   */
  bindEvent(boundaryElement)
}

interface ExportOptions {
  /**
   * 边界元素 | 边界元素选择器
   */
  boundary?: string | Element
}

/**
 * 生成幻灯片节点信息
 * @param options
 */
const generateSlide = (options?: ExportOptions) => {
  const { boundary } = options || {}

  /**
   * 边界元素
   */
  const boundaryElement: Element = boundary ? getElement(boundary) : document.body

  if (!boundaryElement) {
    return
  }

  /**
   * 生成幻灯片节点
   */
  generateSlideNodes(boundaryElement)
}

const htmlToPPT = {
  edit,
  generateSlide,
}

export default htmlToPPT
