import { appendHelperElement, getElement } from "./utils/element";
import { bindEvent } from "./utils/event";

interface EditOptions {
  /**
   * 边界元素 | 边界元素选择器
   * 边界元素以内可编辑
   */
  boundary?: string | Element;
}

const edit = (options?: EditOptions) => {
  const { boundary } = options || {};

  /**
   * 边界元素
   */
  const boundaryElement: Element = boundary
    ? getElement(boundary)
    : document.body;

  if (!boundaryElement) {
    return;
  }

  /**
   * 插入helper元素
   */
  appendHelperElement(boundaryElement);

  /**
   * 绑定事件
   */
  bindEvent(boundaryElement);
};

const htmlToPPT = {
  edit,
};

export default htmlToPPT;
