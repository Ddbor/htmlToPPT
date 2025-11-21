import { helperClassName, hoverBoxClassName } from './helper'

/**
 * 获取元素
 * @param el 元素 | 元素选择器
 * @returns 元素
 */
export const getElement = (el: string | Element) => {
  if (typeof el === 'string') {
    return document.querySelector(el) || document.body
  }

  return el
}

/**
 * 获取子元素相对于指定父元素的边界位置
 * @param {HTMLElement} child - 子元素（必须是父元素的直接/间接子元素）
 * @param {HTMLElement} parent - 指定父元素（必须是子元素的祖先元素）
 * @returns {Object} 相对位置对象（left/top/right/bottom）
 */
export const getChildRelativeToParent = (
  child: HTMLElement,
  parent: HTMLElement
): Omit<DOMRect, 'toJSON'> => {
  // 1. 校验元素有效性（防止传入非DOM元素或无关联的元素）
  if (!(child instanceof HTMLElement) || !(parent instanceof HTMLElement)) {
    throw new Error('请传入有效的DOM元素')
  }
  if (!parent.contains(child)) {
    throw new Error('子元素必须是父元素的后代元素')
  }

  // 2. 获取子元素和父元素在视口坐标系的绝对位置
  const childRect = child.getBoundingClientRect()
  const parentRect = parent.getBoundingClientRect()

  // 3. 计算相对位置（子元素位置 - 父元素位置）
  return {
    // 子元素左边界 → 父元素左边界的距离（X轴偏移）
    left: childRect.left - parentRect.left,
    // 子元素上边界 → 父元素上边界的距离（Y轴偏移）
    top: childRect.top - parentRect.top,
    // 子元素右边界 → 父元素右边界的距离（父元素右边界 - 子元素右边界）
    right: parentRect.right - childRect.right,
    // 子元素下边界 → 父元素下边界的距离（父元素下边界 - 子元素下边界）
    bottom: parentRect.bottom - childRect.bottom,
    x: childRect.x - parentRect.x,
    y: childRect.y - parentRect.y,
    width: childRect.width,
    height: childRect.height,
  }
}

/**
 * 提取DOM树精确副本
 * @param rootElement 根元素
 * @returns 元素数组
 */
export const collectNodesFromInnerToOuter = (rootElement: Element) => {
  const result: (string | Element)[] = []
  const visited = new WeakSet() // 用于跟踪已添加的节点

  // 递归函数，从最内层开始收集
  function collectInnerToOuter(node: Element) {
    // 如果节点已被访问过，直接返回
    if (visited.has(node)) {
      return
    }

    // 如果是文本节点，添加到结果中并标记为已访问
    if (node.nodeType === Node.TEXT_NODE) {
      const textContent = node.textContent
      if (textContent) {
        result.push(node)
        visited.add(node)
      }
      return
    }

    // 如果是元素节点，先递归处理所有子节点
    if (node.nodeType === Node.ELEMENT_NODE) {
      // 先处理所有子节点（从内到外）
      for (let i = 0; i < node.childNodes.length; i++) {
        collectInnerToOuter(node.childNodes[i] as Element)
      }

      if (
        !visited.has(node) &&
        // 排除根元素
        node !== rootElement &&
        // 排除 helperClassName 和 hoverBoxClassName 类名的helper元素
        !node.classList.contains(helperClassName) &&
        !node.classList.contains(hoverBoxClassName)
      ) {
        result.push(node)
        visited.add(node)
      }
    }
  }

  // 开始收集
  collectInnerToOuter(rootElement)

  return result
}
