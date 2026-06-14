import { MarketingLayout } from '../components/Footer'

export function Credits() {
  return (
    <MarketingLayout>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-brass-deep">Image credits</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink">Photography &amp; licensing</h1>
        <p className="mt-4 text-lg text-ink-soft">
          This is a concept redesign of basementdesigner.com. The basement shown in the live 3D designer is rendered from original
          geometry. The photographs are used as follows:
        </p>
        <section className="mt-10 space-y-4 text-sm text-ink-soft">
          <div className="rounded-2xl border border-line bg-paper p-5">
            <h2 className="font-display text-lg font-semibold text-ink">John Browning’s own projects</h2>
            <p className="mt-1">The before-and-after project photos are John Browning’s own work from basementdesigner.com, used here for his redesign concept.</p>
          </div>
          <div className="rounded-2xl border border-line bg-paper p-5">
            <h2 className="font-display text-lg font-semibold text-ink">Inspiration photography</h2>
            <p className="mt-1">Finished-basement inspiration shots via <a href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer" className="text-brass-deep hover:underline">Pexels</a> (free license, no attribution required) — with thanks to Curtis Adams, Peter Vang, Get Lost Mike and Crab Lens.</p>
          </div>
        </section>
        <p className="mt-10 rounded-2xl bg-paper px-5 py-4 text-sm text-ink-soft">
          A concept redesign and prototype — not the live basementdesigner.com. Reviews and awards reflect John’s real Houzz profile.
        </p>
      </div>
    </MarketingLayout>
  )
}
