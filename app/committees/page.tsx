import { ChevronRight } from 'lucide-react'
import { ContentPage } from '@/components/content-page'
import { NationAvatarChooser } from '@/components/nation-avatar-chooser'
import { MUNAvatarChooser } from '@/components/mun-avatar-chooser'

const committees = [
  { number: '01', title: 'World Leaders Summit', focus: 'International peace & security', description: 'A high-stakes diplomatic room for delegates to respond to global challenges, negotiate positions, and build consensus.' },
  { number: '02', title: 'International Press', focus: 'Reporting, accountability & public discourse', description: 'Bring the negotiations to life through sharp reporting, thoughtful interviews, and a clear record of the conference.' },
  { number: '03', title: 'United Nations General Assembly', focus: 'Global cooperation & diplomacy', description: 'Represent a nation, debate shared priorities, and work toward resolutions with a global perspective.' },
]

export default function CommitteesPage() {
  return (
    <ContentPage number="02" eyebrow="THE ROOMS" title="Find your" accent="forum." intro="Each committee offers a different seat at the table. Choose a perspective and make your case.">
      <div className="committee-page-list">
        {committees.map((committee) => (
          <article className="committee-page-card" key={committee.number}>
            <div className="committee-page-title"><span>{committee.number}</span><div><h2>{committee.title}</h2><p>{committee.focus}</p></div><ChevronRight aria-hidden="true" /></div>
            <p className="committee-page-description">{committee.description}</p>
            {committee.number === '01' && <MUNAvatarChooser committee={committee.title} />}
            {committee.number === '03' && <NationAvatarChooser committee={committee.title} />}
          </article>
        ))}
      </div>
    </ContentPage>
  )
}
