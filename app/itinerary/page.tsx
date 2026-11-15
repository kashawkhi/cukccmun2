import { ContentPage } from '@/components/content-page'

const days = [
  { date: '16 OCT', day: 'Day One', title: 'Arrival & opening', detail: 'Welcome, delegate orientation, opening ceremony, and the first committee session.' },
  { date: '17 OCT', day: 'Day Two', title: 'Debate in motion', detail: 'A full day of committee sessions, negotiation, and resolution drafting.' },
  { date: '18 OCT', day: 'Day Three', title: 'Resolutions & farewell', detail: 'Final debate, closing sessions, awards, and conference close.' },
]

export default function ItineraryPage() {
  return (
    <ContentPage number="04" eyebrow="THREE DAYS, ONE WORLD" title="The conference" accent="itinerary." intro="Three days of ideas, debate, and diplomacy at CUK, Bengaluru, from 16–18 October 2027.">
      <div className="itinerary-note"><span className="globe-dot" /> PROGRAM OUTLINE <p>Session timings and room assignments will be shared with registered delegates. This outline may be updated by the Secretariat.</p></div>
      <div className="itinerary-list">{days.map((item) => <article className="itinerary-day" key={item.date}><span className="itinerary-date">{item.date}<small>2027</small></span><div><span className="avatar-kicker">{item.day}</span><h2>{item.title}</h2><p>{item.detail}</p></div></article>)}</div>
    </ContentPage>
  )
}
