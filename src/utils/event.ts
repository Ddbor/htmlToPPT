import { activateHoverBoxStyle, deactivateHoverBoxStyle } from "./element";

let moveElement: HTMLElement | null = null;

const mouseEnterEvent = (e: Event) => {
  const target = e.target as HTMLElement;
  activateHoverBoxStyle(target);
};

const mouseLeaveEvent = (e: Event) => {
  const target = e.target as HTMLElement;
  deactivateHoverBoxStyle(target);
};

const mouseMoveEvent = (e: Event) => {
  const target = e.target as HTMLElement;

  if (target === moveElement) {
    return;
  }

  moveElement = target;
};

/**
 * 解绑事件
 * @param container 容器元素
 */
const unbindEvent = (container: Element) => {
  container.removeEventListener("mouseenter", mouseEnterEvent);

  container.removeEventListener("mouseleave", mouseLeaveEvent);

  container.removeEventListener("mousemove", mouseMoveEvent);
};

/**
 * 绑定事件
 * @param container 容器元素
 */
export const bindEvent = (container: Element) => {
  /**
   * 解绑事件
   */
  unbindEvent(container);
  moveElement = null;

  container.addEventListener("mouseenter", mouseEnterEvent);

  container.addEventListener("mouseleave", mouseLeaveEvent);

  container.addEventListener("mousemove", mouseMoveEvent);
};
