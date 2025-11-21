import interact from 'interactjs'

export const interactStart = (
  el: HTMLElement,
  { onMove, onResize }: { onMove: () => void; onResize: () => void }
) => {
  const interactable = interact(el)
    .resizable({
      edges: { top: true, left: true, bottom: true, right: true },
      listeners: {
        move(event) {
          onResize()

          let target = event.target
          let x = parseFloat(target.getAttribute('data-interact-x')) || 0
          let y = parseFloat(target.getAttribute('data-interact-y')) || 0

          target.style.width = event.rect.width + 'px'
          target.style.height = event.rect.height + 'px'

          x += event.deltaRect.left
          y += event.deltaRect.top

          target.style.transform = `translate(${x}px, ${y}px)`

          target.setAttribute('data-interact-x', x)
          target.setAttribute('data-interact-y', y)
        },
      },
    })
    .draggable({
      listeners: {
        move(event) {
          onMove()

          let target = event.target
          let x = parseFloat(target.getAttribute('data-interact-x')) || 0
          let y = parseFloat(target.getAttribute('data-interact-y')) || 0

          x += event.dx
          y += event.dy

          target.setAttribute('data-interact-x', x)
          target.setAttribute('data-interact-y', y)
          target.style.transform = `translate(${x}px, ${y}px)`
        },
      },
    })

  return interactable
}
