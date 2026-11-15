import type { ReactNode } from 'react'

export function ContentPage({ number, eyebrow, title, accent, intro, children }: { number: string; eyebrow: string; title: string; accent?: string; intro: string; children: ReactNode }) {
  return (
    <main className="content-page">
      <section className="content-hero section-wrap">
        <div className="section-kicker">{number} — {eyebrow}</div>
        <div className="content-heading"><h1>{title}{accent && <>{' '}<em>{accent}</em></>}</h1><p>{intro}</p></div>
      </section>
      <section className="content-body section-wrap">{children}</section>
    </main>
  )
}
