import { ContentPage } from '@/components/content-page'

const roles = ['Secretary-General', 'Director-General', 'Under-Secretary-General', 'Conference Director']

export default function ExecutiveBoardPage() {
  return (
    <ContentPage number="05" eyebrow="LEADERSHIP" title="Meet the" accent="executive board." intro="The student leadership guiding the vision, preparation, and experience of CUKCCMUN’27.">
      <div className="announcement-panel"><span className="avatar-kicker">INTRODUCING THE TEAM</span><h2>Names to be announced.</h2><p>We’re preparing to introduce the Executive Board. Check back for the team shaping this year’s conference.</p></div>
      <div className="role-grid">{roles.map((role, index) => <article className="role-card" key={role}><span>0{index + 1}</span><h3>{role}</h3><p>Executive Board</p></article>)}</div>
    </ContentPage>
  )
}
