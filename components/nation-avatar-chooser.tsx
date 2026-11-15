'use client'

import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, MoveRight } from 'lucide-react'

const nations = [
  ['Federal Republic of Germany', 'DEU', 'de'],
  ['French Republic', 'FRA', 'fr'],
  ['Italian Republic', 'ITA', 'it'],
  ['Kingdom of Spain', 'ESP', 'es'],
  ['Kingdom of the Netherlands', 'NLD', 'nl'],
  ['Kingdom of Belgium', 'BEL', 'be'],
  ['Republic of Poland', 'POL', 'pl'],
  ['Kingdom of Sweden', 'SWE', 'se'],
  ['Republic of Austria', 'AUT', 'at'],
  ['Hellenic Republic', 'GRC', 'gr'],
  ['Swiss Confederation', 'CHE', 'ch'],
  ['United Kingdom of Great Britain and Northern Ireland', 'GBR', 'gb'],
  ['Ukraine', 'UKR', 'ua'],
  ['Russian Federation', 'RUS', 'ru'],
  ['Republic of Türkiye', 'TUR', 'tr'],
  ['United States of America', 'USA', 'us'],
  ['Canada', 'CAN', 'ca'],
  ['United Mexican States', 'MEX', 'mx'],
  ['Republic of Cuba', 'CUB', 'cu'],
  ['Republic of Haiti', 'HTI', 'ht'],
  ['Federative Republic of Brazil', 'BRA', 'br'],
  ['Argentine Republic', 'ARG', 'ar'],
  ['Republic of Colombia', 'COL', 'co'],
  ['Republic of Chile', 'CHL', 'cl'],
  ['Republic of Peru', 'PER', 'pe'],
  ['Bolivarian Republic of Venezuela', 'VEN', 've'],
  ["People's Republic of China", 'CHN', 'cn'],
  ['Republic of India', 'IND', 'in'],
  ['Japan', 'JPN', 'jp'],
  ['Republic of Korea', 'KOR', 'kr'],
  ['Republic of Indonesia', 'IDN', 'id'],
  ['Islamic Republic of Pakistan', 'PAK', 'pk'],
  ["People's Republic of Bangladesh", 'BGD', 'bd'],
  ['Social Republic of Viet Nam', 'VNM', 'vn'],
  ['Republic of the Philippines', 'PHL', 'ph'],
  ['Islamic Republic of Iran', 'IRN', 'ir'],
  ['Kingdom of Saudi Arabia', 'SAU', 'sa'],
  ['State of Qatar', 'QAT', 'qa'],
  ['State of Israel', 'ISR', 'il'],
  ['Federal Democratic Republic of Ethiopia', 'ETH', 'et'],
  ['Federal Republic of Nigeria', 'NGA', 'ng'],
  ['Arab Republic of Egypt', 'EGY', 'eg'],
  ['Republic of South Africa', 'ZAF', 'za'],
  ['Republic of Kenya', 'KEN', 'ke'],
  ['Republic of Ghana', 'GHA', 'gh'],
  ['Democratic Republic of the Congo', 'COD', 'cd'],
  ['Republic of Rwanda', 'RWA', 'rw'],
  ['Kingdom of Morocco', 'MAR', 'ma'],
  ['Republic of Senegal', 'SEN', 'sn'],
  ['Commonwealth of Australia', 'AUS', 'au'],
  ['New Zealand', 'NZL', 'nz'],
  ['Independent State of Papua New Guinea', 'PNG', 'pg'],
  ['Republic of Fiji', 'FJI', 'fj'],
  ['State of Palestine', 'PSE', 'ps'],
] as const

export function NationAvatarChooser({ committee }: { committee: string }) {
  const [selected, setSelected] = useState(0)
  const cardsRef = useRef<Array<HTMLButtonElement | null>>([])
  const railRef = useRef<HTMLDivElement>(null)
  const active = nations[selected]

  const selectNation = (index: number) => {
    setSelected(index)
    const rail = railRef.current
    const card = cardsRef.current[index]
    if (!rail || !card) return
    const railBounds = rail.getBoundingClientRect()
    const cardBounds = card.getBoundingClientRect()
    rail.scrollTo({ left: rail.scrollLeft + cardBounds.left - railBounds.left - (rail.clientWidth - card.clientWidth) / 2, behavior: 'smooth' })
  }

  const move = (direction: number) => selectNation((selected + direction + nations.length) % nations.length)

  return (
    <section className="avatar-chooser nation-avatar-chooser" aria-label={`${committee} country selection`}>
      <div className="avatar-chooser-heading">
        <div><span className="avatar-kicker">CHOOSE YOUR NATION</span><p>Pick a delegation. Shape the room.</p></div>
        <div className="avatar-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous nation"><ChevronLeft /></button>
          <span>{String(selected + 1).padStart(2, '0')} <i>/</i> {String(nations.length).padStart(2, '0')}</span>
          <button type="button" onClick={() => move(1)} aria-label="Next nation"><ChevronRight /></button>
        </div>
      </div>
      <div className="avatar-selector">
        <button className="avatar-feature" type="button" onClick={() => move(1)} aria-label={`Selected nation ${active[0]}. Choose next nation`}>
          <span className="nation-avatar-portrait" role="img" aria-label={`${active[0]} flag`}><span className={`fi fi-${active[2]} nation-flag-icon nation-flag-large`} aria-hidden="true" /></span>
          <span className="avatar-feature-meta"><span><span className={`fi fi-${active[2]} nation-flag-icon nation-flag-inline`} aria-hidden="true" /> {active[1]}</span><strong>{active[0]}</strong><small>NATION DELEGATION <MoveRight /></small></span>
        </button>
        <div ref={railRef} className="avatar-rail" role="group" aria-label="Available nations">
          {nations.map(([name, code, flag], index) => (
            <button ref={(element) => { cardsRef.current[index] = element }} key={code} type="button" className={`avatar-card${selected === index ? ' is-selected' : ''}`} aria-pressed={selected === index} onClick={() => selectNation(index)} aria-label={`Select ${name}`}>
              <span className="nation-avatar-thumb" aria-hidden="true"><span className={`fi fi-${flag} nation-flag-icon nation-flag-thumb`} /></span>
              <span className="avatar-card-flag">{flag}</span>
              <span className="avatar-card-country">{code} · {name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
