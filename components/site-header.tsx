'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Committees', href: '/committees' },
  { label: 'Registration', href: '/registration' },
  { label: 'Itinerary', href: '/itinerary' },
  { label: 'Executive Board', href: '/executive-board' },
  { label: 'Secretariate', href: '/secretariate' },
  { label: 'Contact', href: '/contact' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <Link className="wordmark" href="/" aria-label="CUKCCMUN 27 home"><span>CUKCC</span><b>MUN&apos;27</b></Link>
        <div className={`nav-links${menuOpen ? ' is-open' : ''}`} id="site-navigation">
          {links.map(({ label, href }) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{label}</Link>)}
        </div>
        <Link className="nav-cta" href="/registration">Register <ArrowUpRight size={16} /></Link>
        <button className="menu-button" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </nav>
    </header>
  )
}
