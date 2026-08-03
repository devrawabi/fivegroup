import * as React from 'react'

import { cn } from '@/lib/utils'

type ScrollRevealVariant = 'up' | 'fade' | 'left' | 'right'

type ScrollRevealElement = keyof Pick<
  React.JSX.IntrinsicElements,
  | 'div'
  | 'section'
  | 'article'
  | 'header'
  | 'footer'
  | 'aside'
  | 'main'
  | 'nav'
  | 'li'
  | 'ol'
  | 'ul'
  | 'blockquote'
  | 'span'
  | 'button'
>

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: ScrollRevealElement
  children: React.ReactNode
  className?: string
  delay?: number
  variant?: ScrollRevealVariant
  stagger?: boolean
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export default function ScrollReveal({
  as: Component = 'div',
  children,
  className,
  delay = 0,
  variant = 'up',
  stagger = false,
  threshold = 0.15,
  rootMargin = '0px 0px -8% 0px',
  once = true,
  style,
  ...props
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLElement | null>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [once, threshold, rootMargin])

  return (
    <Component
      ref={ref as never}
      className={cn(
        'scroll-reveal',
        `scroll-reveal-${variant}`,
        stagger && 'scroll-reveal-stagger',
        visible && 'is-visible',
        className,
      )}
      style={
        {
          ...style,
          '--scroll-reveal-delay': `${delay}ms`,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </Component>
  )
}
