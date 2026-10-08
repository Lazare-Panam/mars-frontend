'use client';

import ProductPageHero, { type HeroAction } from '@/Common/product/ProductPageHero';
import type { Crumb } from '@/lib/breadcrumbs';

export default function ProductDetailHero({
  name,
  breadcrumbs,
  subtitle,
  pills,
  actions,
}: {
  actions?: HeroAction[];
  name: string;
  breadcrumbs?: Crumb[];
  subtitle?: string;
  pills?: string[];
}) {
  return <ProductPageHero title={name} breadcrumbs={breadcrumbs} subtitle={subtitle} pills={pills} actions={actions} />;
}
