'use client'

import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, MoveRight } from 'lucide-react'

const roster = [
  ['Adolf Hitler', 'Germany', '🇩🇪'], ['Joseph Stalin', 'USSR', '☭'], ['Vladimir Lenin', 'USSR', '☭'], ['Benito Mussolini', 'Italy', '🇮🇹'], ['Otto von Bismarck', 'Germany', '🇩🇪'],
  ['Mustafa Kemal Atatürk', 'Türkiye', '🇹🇷'], ['Mahatma Gandhi', 'India', '🇮🇳'], ['Jawaharlal Nehru', 'India', '🇮🇳'], ['Muhammad Ali Jinnah', 'Pakistan', '🇵🇰'], ['Subhas Chandra Bose', 'India', '🇮🇳'],
  ['B. R. Ambedkar', 'India', '🇮🇳'], ['Indira Gandhi', 'India', '🇮🇳'], ['Narendra Modi', 'India', '🇮🇳'], ['Atal Bihari Vajpayee', 'India', '🇮🇳'], ['Manmohan Singh', 'India', '🇮🇳'],
  ['Saddam Hussein', 'Iraq', '🇮🇶'], ['Muammar Gaddafi', 'Libya', '🇱🇾'], ['Donald Trump', 'United States', '🇺🇸'], ['Kim Jong Un', 'North Korea', '🇰🇵'], ['Vladimir Putin', 'Russia', '🇷🇺'],
  ['Xi Jinping', 'China', '🇨🇳'], ['Benjamin Netanyahu', 'Israel', '🇮🇱'], ['Emmanuel Macron', 'France', '🇫🇷'], ['Volodymyr Zelenskyy', 'Ukraine', '🇺🇦'], ['Ali Khamenei', 'Iran', '🇮🇷'],
  ['Recep Tayyip Erdoğan', 'Türkiye', '🇹🇷'], ['Luiz Inácio Lula da Silva', 'Brazil', '🇧🇷'], ['Fidel Castro', 'Cuba', '🇨🇺'], ['Che Guevara', 'Cuba', '🇨🇺'], ['Mao Zedong', 'China', '🇨🇳'],
  ['Ho Chi Minh', 'Vietnam', '🇻🇳'], ['Nelson Mandela', 'South Africa', '🇿🇦'], ['Martin Luther King Jr.', 'United States', '🇺🇸'], ['Winston Churchill', 'United Kingdom', '🇬🇧'], ['Franklin D. Roosevelt', 'United States', '🇺🇸'],
  ['John F. Kennedy', 'United States', '🇺🇸'], ['Margaret Thatcher', 'United Kingdom', '🇬🇧'], ['Queen Elizabeth II', 'United Kingdom', '🇬🇧'], ['Barack Obama', 'United States', '🇺🇸'], ['Mikhail Gorbachev', 'USSR', '☭'],
  ['Osama bin Laden', 'Saudi Arabia', '🇸🇦'], ['Aung San Suu Kyi', 'Myanmar', '🇲🇲'], ['Sheikh Mujibur Rahman', 'Bangladesh', '🇧🇩'], ['Sheikh Hasina', 'Bangladesh', '🇧🇩'], ['Benazir Bhutto', 'Pakistan', '🇵🇰'],
  ['Gamal Abdel Nasser', 'Egypt', '🇪🇬'], ['Idi Amin', 'Uganda', '🇺🇬'], ['Pol Pot', 'Cambodia', '🇰🇭'], ['Francisco Franco', 'Spain', '🇪🇸'], ['Giorgia Meloni', 'Italy', '🇮🇹'],
  ['Sanae Takaichi', 'Japan', '🇯🇵'], ['Malala Yousafzai', 'Pakistan', '🇵🇰'], ['Dalai Lama', 'Tibet', '🏳️'], ['Zohran Mamdani', 'United States', '🇺🇸'], ['General Aladeen', 'Wadiya', '★'],
] as const

const delegates = roster.map(([name, nation, flag], index) => ({
  name,
  nation,
  flag,
  sheet: `/avatars/sheet-${String(Math.floor(index / 5) + 1).padStart(2, '0')}.png`,
  slot: index % 5,
}))

function Portrait({ delegate, className, alt }: { delegate: (typeof delegates)[number]; className: string; alt: string }) {
  return <span className={`${className} portrait-sheet`} role="img" aria-label={alt} style={{ backgroundImage: `url(${delegate.sheet})`, backgroundPosition: `${delegate.slot * 25}% center` }} />
}

export function MUNAvatarChooser({ committee }: { committee: string }) {
  const [selected, setSelected] = useState(0)
  const active = delegates[selected]
  const cardsRef = useRef<Array<HTMLButtonElement | null>>([])
  const railRef = useRef<HTMLDivElement>(null)
  const selectDelegate = (index: number) => {
    setSelected(index)
    const rail = railRef.current
    const card = cardsRef.current[index]
    if (rail && card) {
      const railBounds = rail.getBoundingClientRect()
      const cardBounds = card.getBoundingClientRect()
      rail.scrollTo({ left: rail.scrollLeft + cardBounds.left - railBounds.left - (rail.clientWidth - card.clientWidth) / 2, behavior: 'smooth' })
    }
  }
  const move = (direction: number) => selectDelegate((selected + direction + delegates.length) % delegates.length)

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
          <Portrait delegate={active} className="avatar-portrait" alt={`Caricature portrait of ${active.name}`} />
          <span className="avatar-feature-meta"><span>{active.flag} {active.nation}</span><strong>{active.name}</strong><small>DELEGATE PROFILE <MoveRight /></small></span>
        </button>
        <div ref={railRef} className="avatar-rail" role="group" aria-label="Available delegates">
          {delegates.map((delegate, index) => (
            <button ref={(element) => { cardsRef.current[index] = element }} key={delegate.name} type="button" className={`avatar-card${selected === index ? ' is-selected' : ''}`} aria-pressed={selected === index} onClick={() => selectDelegate(index)} aria-label={`Select ${delegate.name}, representing ${delegate.nation}`}>
              <Portrait delegate={delegate} className="avatar-thumb" alt="" />
              <span className="avatar-card-flag">{delegate.flag}</span>
              <span className="avatar-card-country">{delegate.nation}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
