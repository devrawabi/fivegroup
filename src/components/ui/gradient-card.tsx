import type * as React from 'react'
import { useId } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const CARD_PATTERNS: number[][][] = [
  [
    [7, 1],
    [8, 3],
    [9, 2],
    [10, 4],
    [6, 5],
  ],
  [
    [8, 2],
    [7, 4],
    [9, 1],
    [6, 3],
    [10, 5],
  ],
  [
    [6, 2],
    [9, 4],
    [7, 5],
    [8, 1],
    [10, 3],
  ],
  [
    [10, 2],
    [7, 3],
    [8, 5],
    [9, 1],
    [6, 4],
  ],
]

export interface GridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  x?: string
  y?: string
  squares?: number[][]
}

export function GridPattern({
  width = 20,
  height = 20,
  x = '-12',
  y = '4',
  squares,
  className,
  ...props
}: GridPatternProps) {
  const patternId = useId()

  return (
    <svg aria-hidden="true" className={className} {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares ? (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([squareX, squareY]) => (
            <rect
              key={`${squareX}-${squareY}`}
              strokeWidth="0"
              width={width + 1}
              height={height + 1}
              x={squareX * width}
              y={squareY * height}
            />
          ))}
        </svg>
      ) : null}
    </svg>
  )
}

export interface GridBackgroundProps {
  patternIndex?: number
  size?: number
  className?: string
}

export function GridBackground({
  patternIndex = 0,
  size = 20,
  className,
}: GridBackgroundProps) {
  const pattern = CARD_PATTERNS[patternIndex % CARD_PATTERNS.length]

  return (
    <div
      className={cn(
        'pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]',
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-100/30 to-zinc-300/30 opacity-100 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 dark:to-zinc-900/30">
        <GridPattern
          width={size}
          height={size}
          x="-12"
          y="4"
          squares={pattern}
          className="absolute inset-0 h-full w-full fill-black/10 stroke-black/10 mix-blend-overlay dark:fill-white/10 dark:stroke-white/10"
        />
      </div>
    </div>
  )
}

const gradientCardVariants = cva(
  'gradient-card relative overflow-hidden rounded-3xl border p-6 md:p-8',
  {
    variants: {
      tone: {
        light:
          'border-border/60 bg-white text-foreground dark:from-neutral-900 dark:to-neutral-950 dark:text-white',
        dark: 'border-white/10 bg-gradient-to-br from-[var(--secondary-green)] to-[var(--primary-green)] text-white',
        muted:
          'border-border/60 bg-white text-foreground',
      },
      interactive: {
        true: 'transition-transform duration-300 hover:-translate-y-1',
        false: '',
      },
    },
    defaultVariants: {
      tone: 'light',
      interactive: false,
    },
  },
)

export interface GradientCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gradientCardVariants> {
  patternIndex?: number
  showPattern?: boolean
  contentClassName?: string
}

export function GradientCard({
  className,
  tone,
  interactive,
  patternIndex = 0,
  showPattern = true,
  contentClassName,
  children,
  ...props
}: GradientCardProps) {
  return (
    <div className={cn(gradientCardVariants({ tone, interactive }), className)} {...props}>
      {showPattern && tone !== 'dark' ? (
        <GridBackground patternIndex={patternIndex} />
      ) : null}
      <div className={cn('relative z-20 flex h-full flex-col', contentClassName)}>
        {children}
      </div>
    </div>
  )
}

export function GradientCardIcon({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'mb-4 flex size-11 items-center justify-center rounded-2xl bg-[var(--brand-lime-soft)] text-[var(--brand-lime)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function GradientCardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'text-base font-bold tracking-tight text-foreground dark:text-white md:text-lg',
        className,
      )}
      {...props}
    />
  )
}

export function GradientCardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'mt-3 text-sm font-normal leading-relaxed text-muted-foreground dark:text-neutral-400 md:text-base',
        className,
      )}
      {...props}
    />
  )
}

export interface FeatureItem {
  title: string
  description: string
  icon?: React.ReactNode
}

export interface FeaturesSectionWithCardGradientProps {
  features: FeatureItem[]
  className?: string
  columnsClassName?: string
}

export function FeaturesSectionWithCardGradient({
  features,
  className,
  columnsClassName = 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-4',
}: FeaturesSectionWithCardGradientProps) {
  return (
    <div className={cn('py-10 lg:py-16', className)}>
      <div className={cn('mx-auto max-w-7xl', columnsClassName)}>
        {features.map((feature, index) => (
          <GradientCard key={feature.title} patternIndex={index} interactive>
            {feature.icon ? <GradientCardIcon>{feature.icon}</GradientCardIcon> : null}
            <GradientCardTitle>{feature.title}</GradientCardTitle>
            <GradientCardDescription>{feature.description}</GradientCardDescription>
          </GradientCard>
        ))}
      </div>
    </div>
  )
}
