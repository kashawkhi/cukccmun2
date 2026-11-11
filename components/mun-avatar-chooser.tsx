'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, MoveRight } from 'lucide-react'

const delegates = [
  { name: 'Mahatma Gandhi', nation: 'India', flag: '🇮🇳', image: '/avatars/gandhi.png' },
  { name: 'Donald Trump', nation: 'United States', flag: '🇺🇸', image: '/avatars/trump.png' },
  { name: 'King Charles III', nation: 'United Kingdom', flag: '🇬🇧', image: '/avatars/charles.png' },
  { name: 'Joseph Stalin', nation: 'USSR', flag: '☭', image: '/avatars/stalin.png' },
  { name: 'Che Guevara', nation: 'Cuba', flag: '🇨🇺', image: '/avatars/che.png' },
]

export function MUNAvatarChooser({ committee }: { committee: string }) {
  const [selected, setSelected] = useState(0)
  const active = delegates[selected]
  const move = (direction: number) => setSelected((current) => (current + direction + delegates.length) % delegates.length)

  return (
    <section className="avatar-chooser" aria-label={`${committee} delegate avatar selection`}>
      <div className="avatar-chooser-heading">
        <div><span className="avatar-kicker">CHOOSE YOUR DELEGATE</span><p>Pick a voice. Shape the room.</p></div>
        <div className="avatar-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous delegate"><ChevronLeft /></button>
          <span>{String(selected + 1).padStart(2, '0')} <i>/</i> {String(delegates.length).padStart(2, '0')}</span>
          <button type="button" onClick={() => move(1)} aria-label="Next delegate"><ChevronRight /></button>
        </div>
      </div>
      <div className="avatar-selector">
        <button className="avatar-feature" type="button" onClick={() => move(1)} aria-label={`Selected delegate ${active.name}, ${active.nation}. Choose next delegate`}>
          <span className="avatar-portrait"><Image src={active.image} alt={`Caricature portrait of ${active.name}`} fill sizes="150px" priority={selected === 0} /></span>
          <span className="avatar-feature-meta"><span>{active.flag} {active.nation}</span><strong>{active.name}</strong><small>DELEGATE PROFILE <MoveRight /></small></span>
        </button>
        <div className="avatar-rail" role="group" aria-label="Available delegates">
          {delegates.map((delegate, index) => (
            <button key={delegate.nation} type="button" className={`avatar-card${selected === index ? ' is-selected' : ''}`} aria-pressed={selected === index} onClick={() => setSelected(index)} aria-label={`Select ${delegate.name}, representing ${delegate.nation}`}>
              <span className="avatar-thumb"><Image src={delegate.image} alt="" fill sizes="78px" /></span>
              <span className="avatar-card-flag">{delegate.flag}</span>
              <span className="avatar-card-country">{delegate.nation}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
