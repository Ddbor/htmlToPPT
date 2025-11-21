import { convertStylesToAddTextOptions } from './addText'
import { collectNodesFromInnerToOuter } from './element'

interface SlideNode {
  type: 'text' | 'image' | 'block'
  text?: string
  options?: any
}

/**
 * 生成文本幻灯片节点
 */
const generateTextSlideNode = (el: Element): SlideNode => {
  const node = el?.parentElement as HTMLElement
  const styles = getComputedStyle(node)

  return {
    type: 'text',
    text: node.textContent,
    options: convertStylesToAddTextOptions(styles),
  }
}

/**
 * 生成幻灯片节点
 * @param options
 */
export const generateSlideNodes = (container: Element) => {
  const allElements = collectNodesFromInnerToOuter(container)

  const slideNodes: SlideNode[] = []

  for (let i = 0; i < allElements.length; i++) {
    const el = allElements[i]

    if (typeof el === 'string' || el.nodeType === Node.TEXT_NODE) {
      slideNodes.push(generateTextSlideNode(el as Element))
      continue
    }
  }

  return slideNodes
}
