import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="footer">
      <Link className="wordmark" href="/" aria-label="CUKCCMUN 27 home"><span>CUKCC</span><b>MUN&apos;27</b></Link>
      <div className="footer-center"><p>16—18 OCTOBER 2027 · CUK, BENGALURU</p><Link href="/contact">Get in touch</Link></div>
      <p className="footer-note">A conference by<br />Christ University</p>
    </footer>
  )
}
