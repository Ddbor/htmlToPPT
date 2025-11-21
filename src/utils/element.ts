/**
 * 获取元素
 * @param el 元素 | 元素选择器
 * @returns 元素
 */
export const getElement = (el: string | Element) => {
  if (typeof el === "string") {
    return document.querySelector(el) || document.body;
  }

  return el;
};

/**
 * 获取子元素相对于指定父元素的边界位置
 * @param {HTMLElement} child - 子元素（必须是父元素的直接/间接子元素）
 * @param {HTMLElement} parent - 指定父元素（必须是子元素的祖先元素）
 * @returns {Object} 相对位置对象（left/top/right/bottom）
 */
export const getChildRelativeToParent = (
  child: HTMLElement,
  parent: HTMLElement,
): Omit<DOMRect, "toJSON"> => {
  // 1. 校验元素有效性（防止传入非DOM元素或无关联的元素）
  if (!(child instanceof HTMLElement) || !(parent instanceof HTMLElement)) {
    throw new Error("请传入有效的DOM元素");
  }
  if (!parent.contains(child)) {
    throw new Error("子元素必须是父元素的后代元素");
  }

  // 2. 获取子元素和父元素在视口坐标系的绝对位置
  const childRect = child.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

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
  };
};
