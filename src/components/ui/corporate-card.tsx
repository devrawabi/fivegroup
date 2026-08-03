import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { User } from 'lucide-react'

import { cn } from '@/lib/utils'

const corporateCardVariants = cva('corporate-card-shell', {
  variants: {
    variant: {
      default: 'p-6 md:p-8',
      profile: 'flex flex-col overflow-hidden p-0',
      media: 'overflow-hidden p-0',
      inset: 'p-4 md:p-5',
    },
    interactive: {
      true: 'corporate-card-shell--interactive group/card',
      false: '',
    },
    tone: {
      light: '',
      dark: 'corporate-card-shell--dark',
    },
  },
  defaultVariants: {
    variant: 'default',
    interactive: true,
    tone: 'light',
  },
})

export interface CorporateCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof corporateCardVariants> {
  asChild?: boolean
}

const CorporateCard = React.forwardRef<HTMLDivElement, CorporateCardProps>(
  ({ className, variant, interactive, tone, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        ref={ref}
        className={cn(corporateCardVariants({ variant, interactive, tone }), className)}
        {...props}
      />
    )
  },
)
CorporateCard.displayName = 'CorporateCard'

export interface CorporateCardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fit?: 'cover' | 'contain'
  placeholder?: boolean
}

const CorporateCardMedia = React.forwardRef<HTMLDivElement, CorporateCardMediaProps>(
  ({ className, src, alt = '', fit = 'cover', placeholder, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative h-[300px] shrink-0 overflow-hidden bg-white md:h-[340px]',
        className,
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={cn(
            'absolute inset-0 h-full w-full transition-transform duration-300 group/card:hover:scale-[1.03]',
            fit === 'cover'
              ? 'object-cover object-[center_15%]'
              : 'object-contain p-4',
          )}
          loading="lazy"
          decoding="async"
        />
      ) : placeholder || !children ? (
        <div className="flex h-full w-full items-center justify-center bg-neutral-100">
          <User className="h-12 w-12 text-muted-foreground/40" strokeWidth={1.5} aria-hidden />
        </div>
      ) : null}
      {children}
    </div>
  ),
)
CorporateCardMedia.displayName = 'CorporateCardMedia'

const CorporateCardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('border-t border-border p-4 md:p-5', className)}
    {...props}
  />
))
CorporateCardBody.displayName = 'CorporateCardBody'

const CorporateCardName = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-lg font-semibold tracking-tight text-foreground md:text-xl',
      className,
    )}
    {...props}
  />
))
CorporateCardName.displayName = 'CorporateCardName'

const CorporateCardRole = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'mt-1 whitespace-pre-line text-[10px] font-medium uppercase tracking-[0.2em] text-brand md:text-xs',
      className,
    )}
    {...props}
  />
))
CorporateCardRole.displayName = 'CorporateCardRole'

const CorporateCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm leading-relaxed text-muted-foreground', className)} {...props} />
))
CorporateCardContent.displayName = 'CorporateCardContent'

export {
  CorporateCard,
  CorporateCardMedia,
  CorporateCardBody,
  CorporateCardName,
  CorporateCardRole,
  CorporateCardContent,
  corporateCardVariants,
}
