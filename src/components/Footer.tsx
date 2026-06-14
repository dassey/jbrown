import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { Header } from './Header'
import { BUSINESS, CURRENT_YEAR } from '../config/business'
import { buttonClass } from '../lib/ui'

export function Footer() {
  const { address } = BUSINESS
  return (
    <footer className="bg-graphite text-paper/75">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1.2fr]">
          <div className="max-w-xs">
            <div className="text-paper"><Logo size="md" /></div>
            <p className="mt-4 text-sm leading-relaxed text-paper/60">{BUSINESS.blurb}</p>
            <p className="mt-4 font-display text-sm italic text-paper/80">“{BUSINESS.tagline}”</p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-paper/90">Design</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {['Open the designer', 'Basement finishing', 'Egress & code', 'Home theaters & bars'].map((x) => (
                <li key={x}><Link to="/plan" className="text-paper/60 transition-colors hover:text-brass-bright">{x}</Link></li>
              ))}
              <li><a href={BUSINESS.houzzUrl} target="_blank" rel="noopener noreferrer" className="text-paper/60 hover:text-brass-bright">Reviews on Houzz</a></li>
              <li><Link to="/credits" className="text-paper/60 hover:text-brass-bright">Image credits</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-paper/90">Reach John</h4>
            <address className="mt-4 space-y-1 text-sm not-italic text-paper/60">
              <div><a href={`tel:${BUSINESS.phone.replace(/[^0-9]/g, '')}`} className="hover:text-brass-bright">{BUSINESS.phone}</a></div>
              <div><a href={`mailto:${BUSINESS.email}`} className="hover:text-brass-bright">{BUSINESS.email}</a></div>
              <div className="pt-2">{address.city}, {address.state} {address.zip}</div>
              <div className="text-paper/45">{BUSINESS.serviceArea}</div>
            </address>
          </div>
        </div>
        <div className="mt-14 flex justify-center">
          <Link to="/plan" className={buttonClass('primary', 'md')}>Start your design</Link>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-paper/15 pt-6 text-xs text-paper/50 sm:flex-row">
          <span>© {CURRENT_YEAR} {BUSINESS.legalName}</span>
          <span className="rounded-full bg-paper/10 px-3 py-1 text-paper/70">Concept redesign &amp; prototype — not the live site.</span>
        </div>
      </div>
    </footer>
  )
}

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
