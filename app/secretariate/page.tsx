import { ContentPage } from '@/components/content-page'

const teams = [
  { title: 'Delegate Affairs', detail: 'Supporting delegates from registration through the final session.' },
  { title: 'Conference Operations', detail: 'Coordinating the spaces, schedule, and on-site experience.' },
  { title: 'Communications', detail: 'Sharing timely conference information with participants.' },
]

export default function SecretariatPage() {
  return (
    <ContentPage number="06" eyebrow="BEHIND THE CONFERENCE" title="Meet the" accent="Secretariat." intro="A dedicated team working behind the scenes to bring the conference together and support every delegate.">
      <div className="secretariat-intro"><p className="lead">From the first briefing to the closing session, the Secretariat keeps the conference moving—so delegates can focus on the work in the room.</p></div>
      <div className="role-grid">{teams.map((team, index) => <article className="role-card" key={team.title}><span>0{index + 1}</span><h3>{team.title}</h3><p>{team.detail}</p></article>)}</div>
      <p className="announcement-note">Secretariat member introductions will be announced soon.</p>
    </ContentPage>
  )
}
