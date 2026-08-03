import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { isMenuActive, NAV_MENUS } from '@/data/navigation'

function MegaPanel({ menu, onNavigate }) {
  return (
    <div className="nav-mega-panel nav-mega-panel--corporate">
      <div className="nav-mega-featured">
        <div
          className="nav-mega-featured-media"
          style={{ backgroundImage: `url(${menu.featuredImage})` }}
          aria-hidden="true"
        />
        <div className="nav-mega-featured-copy">
          <p className="nav-mega-eyebrow">{menu.eyebrow}</p>
          <h3 className="nav-mega-title">{menu.title}</h3>
          <p className="nav-mega-desc">{menu.description}</p>
          <NavigationMenuLink asChild>
            <a
              href={`#${menu.cta.page}`}
              className="nav-mega-cta"
              onClick={(event) => {
                event.preventDefault()
                onNavigate(menu.cta.page, menu.cta.category)
              }}
            >
              {menu.cta.label}
              <ArrowRight aria-hidden="true" />
            </a>
          </NavigationMenuLink>
        </div>
      </div>

      <div className="nav-mega-submenu" aria-label={`${menu.label} pages`}>
        <div className="nav-mega-categories-head">
          <h3 className="nav-mega-title">Explore</h3>
          <p className="nav-mega-desc">Choose a section to continue.</p>
        </div>
        <ul className="nav-mega-submenu-grid">
          {menu.items.map((item) => (
            <li key={item.id}>
              <NavigationMenuLink asChild>
                <a
                  href={`#${item.page}`}
                  className="nav-mega-link"
                  onClick={(event) => {
                    event.preventDefault()
                    onNavigate(item.page, item.category)
                  }}
                >
                  <span className="nav-mega-link-title">{item.label}</span>
                  <span className="nav-mega-link-desc">{item.description}</span>
                </a>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function NavMegaMenu({ activeTab, onNavigate }) {
  const [value, setValue] = useState('')

  const handleNavigate = (page, category) => {
    setValue('')
    onNavigate(page, category)
  }

  return (
    <NavigationMenu
      value={value}
      onValueChange={setValue}
      delayDuration={80}
      className="nav-mega-root"
    >
      <NavigationMenuList className="nav-mega-list-root">
        {NAV_MENUS.map((menu) => {
          const active = isMenuActive(menu, activeTab)

          return (
            <NavigationMenuItem key={menu.id} value={menu.id}>
              <NavigationMenuTrigger
                className={cn('nav-link-item nav-mega-trigger', active && 'active')}
                data-active={active ? '' : undefined}
              >
                {menu.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <MegaPanel menu={menu} onNavigate={handleNavigate} />
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
