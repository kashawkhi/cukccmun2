import { ArrowUpRight } from 'lucide-react'
import { ContentPage } from '@/components/content-page'

export default function RegistrationPage() {
  return (
    <ContentPage number="03" eyebrow="JOIN THE DELEGATION" title="Take your" accent="seat." intro="Your CUKCCMUN’27 journey starts here. Complete the form below to register your interest and delegate details.">
      <div className="registration-panel">
        <div className="registration-panel-heading"><div><span className="avatar-kicker">DELEGATE REGISTRATION</span><p>16—18 October 2027 · CUK, Bengaluru</p></div><a className="text-link" href="https://tally.so/embed/rDaGrp?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" target="_blank" rel="noreferrer">Open form <ArrowUpRight size={16} /></a></div>
        <div className="tally-frame"><iframe src="https://tally.so/embed/rDaGrp?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" title="CUKCCMUN’27 delegate registration form" loading="lazy" /></div>
      </div>
    </ContentPage>
  )
}
