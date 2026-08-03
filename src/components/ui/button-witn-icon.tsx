import * as React from 'react'
import { ArrowUpRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Exact motion/structure from ButtonWithIconDemo, plus sizing guards so
 * flex parents cannot crush the pill (overflow-hidden + flex-shrink).
 */
const BUTTON_CLASS = cn(
  'relative inline-flex items-center justify-center',
  'h-12 w-fit min-w-max shrink-0',
  'rounded-full p-1 ps-6 pe-14',
  'text-sm font-medium whitespace-nowrap',
  'overflow-hidden cursor-pointer',
  'transition-all duration-500',
  'hover:ps-14 hover:pe-6',
  'group',
)

const ICON_WRAP_CLASS = cn(
  'pointer-events-none absolute top-1/2 right-1 -translate-y-1/2',
  'flex h-10 w-10 shrink-0 items-center justify-center',
  'rounded-full bg-background text-foreground',
  'transition-all duration-500',
  'group-hover:right-[calc(100%-44px)] group-hover:rotate-45',
)

export type ButtonWithIconProps = {
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  /** Invert colors for dark photo/green surfaces — same geometry */
  onDark?: boolean
}

const ButtonWithIcon = ({
  children = "Let's Collaborate",
  onClick,
  type = 'button',
  className,
  disabled,
  onDark = false,
}: ButtonWithIconProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      variant={onDark ? 'secondary' : 'default'}
      size="none"
      className={cn(
        BUTTON_CLASS,
        onDark && 'bg-background text-foreground hover:bg-background/90',
        className,
      )}
    >
      <span className="relative z-10 whitespace-nowrap transition-all duration-500">
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          ICON_WRAP_CLASS,
          onDark && 'bg-primary text-primary-foreground',
        )}
      >
        <ArrowUpRight size={16} />
      </span>
    </Button>
  )
}

const ButtonWithIconDemo = () => {
  return (
    <Button size="none" className={BUTTON_CLASS}>
      <span className="relative z-10 whitespace-nowrap transition-all duration-500">
        Let's Collaborate
      </span>
      <span aria-hidden className={ICON_WRAP_CLASS}>
        <ArrowUpRight size={16} />
      </span>
    </Button>
  )
}

export { ButtonWithIcon }
export default ButtonWithIconDemo
