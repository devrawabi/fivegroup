import * as React from 'react'

import { cn } from '@/lib/utils'

export type LogoEntry =
  | string
  | {
      name: string
      image?: string
    }

export interface LogoScrollerProps {
  logos: LogoEntry[]
  speed?: string
  className?: string
}

function getLogoName(logo: LogoEntry): string {
  return typeof logo === 'string' ? logo : logo.name
}

function getLogoImage(logo: LogoEntry): string | undefined {
  return typeof logo === 'string' ? undefined : logo.image
}

function LogoItem({ logo }: { logo: LogoEntry }) {
  const name = getLogoName(logo)
  const image = getLogoImage(logo)

  return (
    <span className="logo-item">
      {image ? (
        <span className="logo-item-image">
          <img src={image} alt="" loading="lazy" decoding="async" />
        </span>
      ) : null}
      <span className="logo-item-name">{name}</span>
    </span>
  )
}

/**
 * Infinite horizontal logo scroller with duplicated track for seamless looping.
 */
export default function LogoScroller({ logos, speed = '40s', className }: LogoScrollerProps) {
  if (!logos || logos.length === 0) return null

  return (
    <div className={cn('scroller-mask group', className)}>
      <div
        className="scroller-track animate-scroll"
        style={{ '--scroll-duration': speed } as React.CSSProperties}
      >
        <div className="scroller-set">
          {logos.map((logo, index) => (
            <LogoItem key={`${getLogoName(logo)}-${index}`} logo={logo} />
          ))}
        </div>
        <div className="scroller-set" aria-hidden="true">
          {logos.map((logo, index) => (
            <LogoItem key={`dup-${getLogoName(logo)}-${index}`} logo={logo} />
          ))}
        </div>
      </div>
    </div>
  )
}
