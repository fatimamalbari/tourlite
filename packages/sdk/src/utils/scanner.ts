export interface InteractableElement {
  id: string
  tag: string
  text: string
  selector: string
  role?: string
  placeholder?: string
  location?: {
    x: number
    y: number
    width: number
    height: number
  }
}

/**
 * Checks if an element is truly visible to the user.
 * Inspired by driver.js and industry standards.
 */
function isElementVisible(el: HTMLElement): boolean {
  if (!el) return false
  
  const style = window.getComputedStyle(el)
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
    return false
  }

  // Check dimensions and client rects
  const hasSize = !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
  if (!hasSize) return false

  return true
}

/**
 * Generates the best possible label for an element.
 */
function getElementLabel(el: HTMLElement): string {
  return (
    el.getAttribute('aria-label') ||
    el.getAttribute('title') ||
    (el as HTMLInputElement).placeholder ||
    el.innerText ||
    el.getAttribute('alt') ||
    ''
  ).trim().substring(0, 60)
}

/**
 * Generates a stable CSS selector for the element.
 */
function generateSelector(el: HTMLElement): string {
  if (el.id) return `#${CSS.escape ? CSS.escape(el.id) : el.id}`
  
  // Try to find a unique attribute
  const uniqueAttrs = ['name', 'data-testid', 'data-qa']
  for (const attr of uniqueAttrs) {
    const val = el.getAttribute(attr)
    if (val) {
      const escaped = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(val) : val.replace(/(["\\])/g, '\\$1')
      return `[${attr}="${escaped}"]`
    }
  }

  const path: string[] = []
  let current: HTMLElement | null = el
  
  while (current && current !== document.body) {
    let selector = current.tagName.toLowerCase()
    if (current.id) {
      selector += `#${current.id}`
      path.unshift(selector)
      break
    } else {
      // Add nth-of-type if it's not unique among siblings
      const parent = current.parentElement
      if (parent) {
        const siblings = Array.from(parent.children)
        const sameTagSiblings = siblings.filter(s => s.tagName === current?.tagName)
        if (sameTagSiblings.length > 1) {
          const index = sameTagSiblings.indexOf(current) + 1
          selector += `:nth-of-type(${index})`
        }
      }
    }
    path.unshift(selector)
    current = current.parentElement
  }
  
  return path.join(' > ')
}

/**
 * Scans the page for interactable elements and returns a "Map of Intent".
 */
export function scanPage(): InteractableElement[] {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return []
  }

  const interactables: InteractableElement[] = []
  
  // Broad discovery query
  const query = 'button, a, input, select, textarea, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])'
  const elements = document.querySelectorAll(query)
  
  elements.forEach((el, index) => {
    const htmlEl = el as HTMLElement
    
    if (!isElementVisible(htmlEl)) return

    const text = getElementLabel(htmlEl)
    if (!text && htmlEl.tagName !== 'INPUT') return // Ignore empty non-input elements

    const rect = htmlEl.getBoundingClientRect()

    interactables.push({
      id: `ai-el-${index}`,
      tag: htmlEl.tagName.toLowerCase(),
      text,
      selector: generateSelector(htmlEl),
      role: htmlEl.getAttribute('role') || undefined,
      placeholder: (htmlEl as HTMLInputElement).placeholder || undefined,
      location: {
        x: Math.round(rect.left),
        y: Math.round(rect.top),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      }
    })
  })

  // Deduplicate by selector
  const seenSelectors = new Set<string>()
  return interactables.filter(item => {
    if (seenSelectors.has(item.selector)) return false
    seenSelectors.add(item.selector)
    return true
  })
}
