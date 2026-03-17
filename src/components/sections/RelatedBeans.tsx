import { BeanCard } from '@/components/ui/BeanCard'
import type { BeanWithStats } from '@/types'

interface RelatedBeansProps {
  beans: BeanWithStats[]
}

export function RelatedBeans({ beans }: RelatedBeansProps) {
  if (beans.length === 0) return null

  return (
    <section>
      <h2 className="font-display font-semibold text-2xl text-[var(--color-text)] mb-6">
        Similar Beans
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {beans.map((bean) => (
          <BeanCard key={bean.id} bean={bean} />
        ))}
      </div>
    </section>
  )
}
