import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { ContentPage } from '@/components/content-page'

export default function ContactPage() {
  return (
    <ContentPage number="07" eyebrow="START A CONVERSATION" title="We’re" accent="listening." intro="Questions about registration, committees, or the conference? Reach the CUKCCMUN’27 team.">
      <div className="contact-grid">
        <a className="contact-card" href="mailto:mun@cuk.ac.in"><Mail aria-hidden="true" /><span className="avatar-kicker">EMAIL THE TEAM</span><h2>mun@cuk.ac.in</h2><p>For delegate and conference enquiries.</p><ArrowUpRight className="contact-arrow" aria-hidden="true" /></a>
        <div className="contact-card"><MapPin aria-hidden="true" /><span className="avatar-kicker">MEET US</span><h2>CUK, Bengaluru</h2><p>Christ University, Bengaluru, India.</p></div>
      </div>
    </ContentPage>
  )
}
