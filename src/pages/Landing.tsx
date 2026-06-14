import { Link } from 'react-router-dom'
import { MarketingLayout } from '../components/Footer'
import { BUSINESS } from '../config/business'
import { asset, buttonClass } from '../lib/ui'

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-brass-deep">{children}</p>
}

/* ----------------------------------- HERO ----------------------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div>
          <Eyebrow>Basement design by John Browning · since 2003</Eyebrow>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.03] tracking-tight text-ink sm:text-6xl">
            Your basement,
            <span className="block text-brass">beautifully planned.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            John Browning has turned 3,500+ awkward, post-filled basements into open, flowing living space. Sketch yours here in
            2D and 3D — with live code checks and a budget — then hand it to John to make it real.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/plan" className={buttonClass('primary', 'lg')}>
              Design your basement — free
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            <a href="#designer" className={buttonClass('outline', 'lg')}>See how it works</a>
          </div>
          <p className="mt-6 font-display text-lg italic text-walnut">“It’s all in the plan.”</p>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-[1.75rem] border border-line">
            <img src={asset('images/basement/hero.jpg')} alt="A beautifully finished basement" className="aspect-[4/3.4] w-full object-cover" />
          </div>
          <div className="absolute -left-3 bottom-8 hidden rounded-2xl border border-line bg-paper px-4 py-3 shadow-[var(--shadow-float)] sm:block">
            <div className="flex items-center gap-1 text-brass">
              {Array.from({ length: 5 }).map((_, i) => <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor"><path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9z" /></svg>)}
            </div>
            <p className="mt-1 text-sm font-semibold text-ink">5.0 · 80 Houzz reviews</p>
          </div>
          <div className="absolute -right-3 top-8 hidden rounded-2xl border border-line bg-graphite px-4 py-3 text-center text-paper shadow-[var(--shadow-float)] sm:block">
            <p className="font-display text-2xl font-semibold leading-none">Best of Houzz</p>
            <p className="mt-1 text-[11px] uppercase tracking-wider text-paper/55">12 years running</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y border-line bg-paper/50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4">
        {BUSINESS.stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-3xl font-semibold text-walnut">{s.value}</div>
            <div className="mt-1 text-sm text-ink-soft">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* --------------------------------- DESIGNER --------------------------------- */
const TOOLS = [
  { t: '2D floor plan', b: 'Lay out rooms, a wet bar, an egress bedroom — drag and snap to scale.' },
  { t: 'Real-time 3D', b: 'Flip to a 3D model and walk your finished basement before it’s built.' },
  { t: 'Live code check', b: 'Egress, ceiling height, room sizes, bathroom fixtures — checked as you go.' },
  { t: 'Budget estimate', b: 'A running ballpark by finished square foot, updated instantly.' },
]
function Designer() {
  return (
    <section id="designer" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <Eyebrow>The 2D / 3D basement designer</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Try the layout yourself.</h2>
          <p className="mt-4 text-lg text-ink-soft">
            The same kind of CAD planning John has done for 40 years — now in your browser. Sketch a layout, see it in 3D, and the
            tool flags anything that won’t pass code. When you’re happy, send it over and John refines it into permit-ready plans.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {TOOLS.map((x) => (
              <div key={x.t} className="rounded-2xl border border-line bg-paper p-4">
                <h3 className="font-display text-base font-semibold text-ink">{x.t}</h3>
                <p className="mt-1 text-sm leading-snug text-ink-soft">{x.b}</p>
              </div>
            ))}
          </div>
          <Link to="/plan" className={buttonClass('dark', 'md', 'mt-7')}>Open the designer</Link>
        </div>
        <div className="overflow-hidden rounded-[1.5rem] border border-line">
          <img src={asset('images/basement/living.jpg')} alt="Finished basement living room" className="aspect-[4/3.2] w-full object-cover" />
        </div>
      </div>
    </section>
  )
}

/* --------------------------------- SERVICES --------------------------------- */
const SERVICES = [
  ['Finished basement design', 'Open, flowing plans that work around posts and ducts — not boxed-in mazes.'],
  ['Egress & legal bedrooms', 'Code-compliant egress windows so a basement bedroom is a real, safe bedroom.'],
  ['Home theaters', 'Feature walls, tiered seating and a true screen wall, wired right.'],
  ['Wet bars & wine rooms', 'The social heart of the basement — “The Basement Social Wet Bar.”'],
  ['Bathrooms', 'Full or half baths with vanities, showers and walk-in closets.'],
  ['Ceilings & soffits', 'Soffits that hide the ductwork — drywall that matches upstairs, not a drop ceiling.'],
]
function Services() {
  return (
    <section className="border-y border-line bg-paper/50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <Eyebrow>What John designs</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Every part of the basement.</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(([t, b]) => (
            <div key={t} className="rounded-2xl border border-line bg-paper p-6">
              <h3 className="font-display text-lg font-semibold text-ink">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ REAL PROJECTS ------------------------------- */
function Projects() {
  const pairs = [
    { before: 'images/johns/theater-before.jpg', after: 'images/johns/theater-after.jpg', label: 'Home theater feature wall' },
    { before: 'images/johns/bar-before.jpg', after: 'images/johns/bar-after.jpg', label: 'Basement wet bar' },
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <div className="max-w-2xl">
        <Eyebrow>John’s real projects</Eyebrow>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Bare concrete to beautiful.</h2>
        <p className="mt-4 text-lg text-ink-soft">A couple of John’s own before-and-afters — the kind of transformation a good plan makes possible.</p>
      </div>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {pairs.map((p) => (
          <div key={p.label}>
            <div className="grid grid-cols-2 gap-3">
              {[['Before', p.before], ['After', p.after]].map(([tag, src]) => (
                <div key={tag} className="relative overflow-hidden rounded-2xl border border-line">
                  <img src={asset(src)} alt={`${p.label} ${tag}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  <span className="absolute left-2 top-2 rounded-full bg-ink/75 px-2.5 py-0.5 text-[11px] font-semibold text-paper">{tag}</span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-center text-sm font-medium text-ink-soft">{p.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------------------------- AWARDS ---------------------------------- */
const AWARDS = [
  { v: 'Best of Houzz', d: 'Design, Customer Service & Service — 12 straight years, 2015–2026.' },
  { v: '5.0 ★ · 80', d: 'A perfect five-star average across 80 Houzz reviews.' },
  { v: 'Certified Kitchen Designer', d: 'Member of the National Kitchen & Bath Association (NKBA).' },
  { v: 'Built to code', d: 'Every plan drawn to current IRC / ICC building codes.' },
]
function Awards() {
  return (
    <section id="awards" className="scroll-mt-20 bg-graphite py-20 text-paper lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-brass-bright">Recognition</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Trusted, and awarded, for over a decade.</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AWARDS.map((a) => (
            <div key={a.v} className="rounded-2xl bg-paper/[0.06] p-6 ring-1 ring-paper/10">
              <div className="font-display text-xl font-semibold text-brass-bright">{a.v}</div>
              <p className="mt-2 text-sm leading-relaxed text-paper/70">{a.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------- REVIEWS ---------------------------------- */
const REVIEWS = [
  { q: 'I am extremely satisfied with the service and professionalism provided by John Browning, who fulfilled our every wish in designing our basement plans.', n: 'Phil Liberatore', src: 'Houzz' },
  { q: 'John did a superb job on our design — beautiful work that fit perfectly with our existing decor. Courteous and professional throughout.', n: 'Dan Karbginsky', src: 'Houzz' },
  { q: 'John prepared a beautiful design that incorporated all of our wishes. Exactly what we were hoping for.', n: 'Prabhakar Singh', src: 'Houzz' },
]
function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 lg:py-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <Eyebrow>What clients say</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">80 five-star reviews. No exceptions.</h2>
        </div>
        <a href={BUSINESS.houzzUrl} target="_blank" rel="noopener noreferrer" className={buttonClass('outline', 'sm')}>Read them on Houzz →</a>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {REVIEWS.map((r) => (
          <figure key={r.n} className="flex flex-col rounded-2xl border border-line bg-paper p-7">
            <div className="flex gap-1 text-brass">
              {Array.from({ length: 5 }).map((_, i) => <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor"><path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9 4.8 17.6l1-5.8L1.5 7.7l5.9-.9z" /></svg>)}
            </div>
            <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-soft">“{r.q}”</blockquote>
            <figcaption className="mt-5">
              <div className="font-display font-semibold text-ink">{r.n}</div>
              <div className="text-sm text-ink-faint">via {r.src}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

/* ---------------------------------- ABOUT ----------------------------------- */
function About() {
  return (
    <section id="about" className="border-t border-line bg-paper/50 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[1.75rem] border border-line">
          <img src={asset('images/basement/fireplace.jpg')} alt="A warm finished basement" className="aspect-[4/3] w-full object-cover" />
        </div>
        <div>
          <Eyebrow>About John</Eyebrow>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">A self-taught “closet architect.”</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            John Browning has been in the building trades since 1982 — handyman, kitchen showroom owner, finisher, and finally the
            designer behind thousands of Denver-area basements. In 2003 he started designing basements by email, and he hasn’t
            looked back.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            “The basement wasn’t designed around the nice floor plan upstairs — it was put there to house the utilities. I look at one
            and see a blank canvas. I’ve never found a basement I couldn’t turn into a beautiful living space.”
          </p>
          <p className="mt-4 text-sm text-ink-faint">
            With 3,500+ basements and 90,000+ hours of CAD behind him, John doesn’t need to stand in yours to design it.
          </p>
          <Link to="/plan" className={buttonClass('dark', 'md', 'mt-8')}>Start with John</Link>
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const shots = ['images/basement/bar.jpg', 'images/basement/game.jpg', 'images/basement/leather.jpg', 'images/basement/bedroom.jpg', 'images/basement/stairs.jpg', 'images/basement/retrobar.jpg']
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {shots.map((s) => (
          <div key={s} className="overflow-hidden rounded-2xl border border-line">
            <img src={asset(s)} alt="Finished basement inspiration" loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105" />
          </div>
        ))}
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:pb-28">
      <div className="relative overflow-hidden rounded-[2rem] bg-graphite px-6 py-16 text-center text-paper sm:px-12">
        <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">Let’s design your basement.</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-paper/70">Sketch it yourself in the designer, or call John and talk it through.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/plan" className={buttonClass('primary', 'lg')}>Open the designer</Link>
          <a href={`tel:${BUSINESS.phone.replace(/[^0-9]/g, '')}`} className={buttonClass('outline', 'lg', 'border-paper/30 text-paper hover:bg-paper/10 hover:border-paper/60')}>{BUSINESS.phone}</a>
        </div>
      </div>
    </section>
  )
}

export function Landing() {
  return (
    <MarketingLayout>
      <Hero />
      <Stats />
      <Designer />
      <Services />
      <Projects />
      <Awards />
      <Reviews />
      <About />
      <Gallery />
      <CTA />
    </MarketingLayout>
  )
}
