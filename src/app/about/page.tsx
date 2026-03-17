import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Cupped',
  description:
    'Cupped is a specialty coffee discovery platform. Learn how we select beans, our affiliate disclosure, and how to find your perfect cup.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12">
      <h1 className="font-display text-4xl font-bold text-[var(--color-text)] mb-4">
        About Cupped
      </h1>
      <p className="text-[var(--color-muted)] font-mono text-sm mb-10">
        Find your perfect cup. Search by flavor, not by brand.
      </p>

      <div className="prose prose-stone max-w-none space-y-8">
        <section>
          <h2 className="font-display text-2xl font-semibold text-[var(--color-text)] mb-4">
            What is Cupped?
          </h2>
          <p className="text-[var(--color-text)] leading-relaxed mb-3">
            Cupped is a specialty coffee discovery directory. We help coffee drinkers find beans
            based on flavor — not brand loyalty or marketing. Whether you&apos;re craving something
            fruity and floral, rich and chocolatey, or wild and tropical, Cupped helps you find
            the right bean.
          </p>
          <p className="text-[var(--color-text)] leading-relaxed">
            We curate a directory of beans from leading specialty roasters — Stumptown, Blue
            Bottle, Intelligentsia, Onyx, Verve, and more — and tag each one with structured
            tasting notes so you can search by what you actually want to taste.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-[var(--color-text)] mb-4">
            How beans are selected
          </h2>
          <p className="text-[var(--color-text)] leading-relaxed mb-3">
            We focus on specialty-grade coffees from roasters who prioritize direct trade,
            transparency, and quality sourcing. Beans are selected based on:
          </p>
          <ul className="space-y-2 text-[var(--color-text)] text-sm">
            {[
              'Clear and honest flavor descriptions from the roaster',
              'Traceable origin information (farm, region, process)',
              'Specialty-grade quality (84+ on the SCA scale)',
              'Direct or transparent trade relationships',
              'Community reviews and tasting notes',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-[var(--color-accent)] mt-0.5">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section id="affiliate">
          <h2 className="font-display text-2xl font-semibold text-[var(--color-text)] mb-4">
            Affiliate disclosure
          </h2>
          <div className="bg-[var(--color-accent-soft)] border border-[var(--color-accent)] rounded-xl p-5">
            <p className="text-[var(--color-text)] leading-relaxed mb-3">
              <strong>Cupped participates in affiliate programs.</strong> When you click a &ldquo;Buy
              This Bean&rdquo; or &ldquo;Buy from [Roaster]&rdquo; button and make a purchase, Cupped may earn
              a small commission at no additional cost to you.
            </p>
            <p className="text-[var(--color-text)] leading-relaxed mb-3">
              This commission helps us maintain and improve the directory, add new beans, and keep
              the site free to use.
            </p>
            <p className="text-[var(--color-text)] leading-relaxed">
              Our editorial selections are independent of affiliate relationships. We curate beans
              based on quality and flavor, not commission rates. We only list beans we would
              genuinely recommend.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-[var(--color-text)] mb-4">
            Reviews
          </h2>
          <p className="text-[var(--color-text)] leading-relaxed">
            Reviews on Cupped are submitted by community members and are not verified purchases.
            We do not edit, censor, or remove reviews except in cases of spam or clearly
            inappropriate content. Star ratings are averaged across all submitted reviews.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-[var(--color-text)] mb-4">
            Get in touch
          </h2>
          <p className="text-[var(--color-text)] leading-relaxed">
            If you&apos;re a roaster and would like to have your beans listed in our directory, or if
            you have questions, corrections, or suggestions, we&apos;d love to hear from you.
          </p>
        </section>

        <div className="pt-4 border-t border-[var(--color-border)]">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:bg-[var(--color-accent-dark)] transition-colors"
          >
            Start exploring beans →
          </Link>
        </div>
      </div>
    </div>
  )
}
