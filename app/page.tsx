import { ArrowUpRight, CalendarDays, ChevronRight, Globe2, Landmark, Menu, Scale, Star } from 'lucide-react'
import { GlobalSummitGlobe } from '@/components/global-summit-globe'

const pillars = [
  { icon: Scale, title: 'Diplomacy', text: 'Find common ground across every room.' },
  { icon: Globe2, title: 'Perspective', text: 'Represent nations. Understand the world.' },
  { icon: Landmark, title: 'Leadership', text: 'Speak with purpose. Lead with impact.' },
]

export default function Page() {
  return (
    <main className="mun-site">
      <div className="topline" aria-hidden="true" />
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="CUKCCMUN 27 home"><span>CUKCC</span><b>MUN&apos;27</b></a>
        <div className="nav-links">
          <a href="#about">About</a><a href="#committees">Committees</a><a href="#schedule">Schedule</a><a href="#contact">Contact</a>
        </div>
        <a className="nav-cta" href="#register">Register <ArrowUpRight size={16} /></a>
        <button className="menu-button" aria-label="Open menu"><Menu size={21} /></button>
      </nav>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> CUKCC PRESENTS</p>
          <h1>Where nations<br /><em>meet purpose.</em></h1>
          <p className="hero-intro">An arena for ideas, diplomacy, and the leaders who shape what comes next.</p>
          <div className="hero-actions"><a className="button button-gold" href="#register">Secure your seat <ArrowUpRight size={17} /></a><a className="text-link" href="#about">Discover CUKCCMUN <ChevronRight size={16} /></a></div>
        </div>
        <div className="hero-seal" aria-label="CUKCCMUN 2027 emblem"><div className="seal-ring"><span>CUKCCMUN • EST. 2027 • CUKCCMUN •</span><div className="seal-center"><Star size={19} fill="currentColor" /><strong>27</strong><small>CONFERENCE</small></div></div></div>
        <div className="hero-meta"><span>01 /</span><span>16—18 OCTOBER 2027</span><span className="meta-rule" /><span>CUK, BENGALURU</span></div>
        <div className="scroll-cue"><span>Scroll to explore</span><i /></div>
      </section>

      <section id="about" className="intro-section section-wrap">
        <div className="section-kicker">01 — THE CONFERENCE</div>
        <div className="intro-grid"><h2>More than a<br /><em>conference.</em></h2><div><p className="lead">CUKCCMUN&apos;27 is where conviction meets conversation. A three-day simulation built for sharp minds, bold voices, and the difficult work of finding a way forward.</p><a className="text-link dark-link" href="#committees">Our vision <ChevronRight size={16} /></a></div></div>
        <div className="pillars">{pillars.map(({ icon: Icon, title, text }) => <div className="pillar" key={title}><Icon size={23} strokeWidth={1.4} /><span className="pillar-number">0{pillars.findIndex((p) => p.title === title) + 1}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
      </section>

      <section id="committees" className="committees-section section-wrap"><div className="section-kicker">02 — THE ROOMS</div><div className="committee-heading"><h2>Enter the<br /><em>conversation.</em></h2><p>From the halls of power to the frontlines of change, choose your room and make your case.</p></div><div className="committee-list"><div><span>01</span><strong>United Nations Security Council</strong><small>International peace &amp; security</small><ChevronRight /></div><div><span>02</span><strong>United Nations Human Rights Council</strong><small>Rights, justice &amp; dignity</small><ChevronRight /></div><div className="global-summit-row"><div className="global-summit-copy"><span>03</span><strong>Global Nations Summit</strong><small>Global cooperation &amp; diplomacy</small><p>Track the world&apos;s major voices as they gather to negotiate a shared future.</p><ChevronRight /></div><GlobalSummitGlobe /></div></div></section>

      <section id="schedule" className="quote-section"><div className="quote-mark">“</div><blockquote>Great diplomacy begins<br />with a <em>single voice.</em></blockquote><p>— THE CUKCCMUN&apos;27 PRINCIPLE</p></section>

      <section id="register" className="register-section section-wrap"><div className="register-panel"><div><p className="eyebrow"><span className="eyebrow-line" /> JOIN THE DELEGATION</p><h2>Bring your<br /><em>best argument.</em></h2><p>Registrations for CUKCCMUN&apos;27 are now open. The floor is yours.</p></div><a className="button button-dark" href="mailto:mun@cuk.ac.in">Register now <ArrowUpRight size={17} /></a></div></section>

      <footer id="contact" className="footer"><a className="wordmark" href="#top"><span>CUKCC</span><b>MUN&apos;27</b></a><div className="footer-center"><p>16—18 OCTOBER 2027 · CUK, BENGALURU</p><a href="mailto:mun@cuk.ac.in">mun@cuk.ac.in</a></div><p className="footer-note">A conference by<br />Christ University</p></footer>
    </main>
  )
}
