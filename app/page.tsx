import Image from 'next/image'
import { ArrowUpRight, ChevronRight, Globe2, Landmark, Scale } from 'lucide-react'
import { NationAvatarChooser } from '@/components/nation-avatar-chooser'
import { MUNAvatarChooser } from '@/components/mun-avatar-chooser'

const pillars = [
  { icon: Scale, title: 'Diplomacy', text: 'Find common ground across every room.' },
  { icon: Globe2, title: 'Perspective', text: 'Represent nations. Understand the world.' },
  { icon: Landmark, title: 'Leadership', text: 'Speak with purpose. Lead with impact.' },
]

export default function Page() {
  return (
    <main className="home-page">

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> CUKCC PRESENTS</p>
          <h1>Debate Vs.<br /><em>Dicussion meets Excellence.</em></h1>
          <p className="hero-intro">An arena for ideas, diplomacy, and the leaders who shape what comes next.</p>
          <div className="hero-actions"><a className="button button-gold" href="/registration">Secure your seat <ArrowUpRight size={17} /></a><a className="text-link" href="/committees">Discover CUKCCMUN <ChevronRight size={16} /></a></div>
        </div>
        <div className="hero-logo-art"><Image src="/mun27-emblem.png" alt="CUKCCMUN’27 Second Edition emblem" width={900} height={920} priority /></div>
        <div className="hero-meta"><span>01 /</span><span>16—18 OCTOBER 2027</span><span className="meta-rule" /><span>CUK, BENGALURU</span></div>
        <div className="scroll-cue"><span>Scroll to explore</span><i /></div>
      </section>

      <section id="about" className="intro-section section-wrap">
        <div className="section-kicker">01 — THE CONFERENCE</div>
        <div className="intro-grid"><h2>More than a<br /><em>conference.</em></h2><div><p className="lead">CUKCCMUN&apos;27 is where conviction meets conversation. A three-day simulation built for sharp minds, bold voices, and the difficult work of finding a way forward.</p><a className="text-link dark-link" href="#committees">Our vision <ChevronRight size={16} /></a></div></div>
        <div className="pillars">{pillars.map(({ icon: Icon, title, text }) => <div className="pillar" key={title}><Icon size={23} strokeWidth={1.4} /><span className="pillar-number">0{pillars.findIndex((p) => p.title === title) + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
      </section>

      <section id="committees" className="committees-section section-wrap"><div className="section-kicker">02 — THE ROOMS</div><div className="committee-heading"><h2>Enter the<br /><em>conversation.</em></h2><p>From the halls of power to the frontlines of change, choose your room and make your case.</p></div><div className="committee-list"><div className="committee-chooser-block"><div className="committee-row"><span>01</span><strong>World Leaders Summit</strong><small>International peace &amp; security</small><ChevronRight /></div><MUNAvatarChooser committee="World Leaders Summit" /></div><div className="committee-row"><span>02</span><strong>International Press</strong><small>Rights, justice &amp; dignity</small><ChevronRight /></div><div className="committee-chooser-block"><div className="committee-row"><span>03</span><strong>United Nations General Assembly</strong><small>Global cooperation &amp; diplomacy</small><ChevronRight /></div><NationAvatarChooser committee="United Nations General Assembly" /></div></div></section>

      <section id="schedule" className="schedule-section section-wrap"><div className="section-kicker">03 — SCHEDULE &amp; REGISTRATION</div><div className="schedule-heading"><h2>Make your<br /><em>move.</em></h2><p>Plan your conference experience and secure your place at CUKCCMUN&apos;27.</p></div><div className="tally-frame"><iframe src="https://tally.so/embed/rDaGrp?alignLeft=1&amp;hideTitle=1&amp;transparentBackground=1&amp;dynamicHeight=1" title="CUKCCMUN’27 schedule and registration form" loading="lazy" /></div></section>

      <section id="register" className="register-section section-wrap"><div className="register-panel"><div><p className="eyebrow"><span className="eyebrow-line" /> JOIN THE DELEGATION</p><h2>Bring your<br /><em>best argument.</em></h2><p>Registrations for CUKCCMUN&apos;27 are now open. The floor is yours.</p></div><a className="button button-dark" href="mailto:mun@cuk.ac.in">Register now <ArrowUpRight size={17} /></a></div></section>

    </main>
  )
}
