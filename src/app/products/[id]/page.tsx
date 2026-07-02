'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import { useProductCatalog } from '@/api/useProductCatalog';
import ProductHero from '../components/ProductHero';
import ProductCard from './components/ProductCard';

export default function ProductCatalogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data, isLoading, isError } = useProductCatalog(id);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Typography sx={{ color: 'text.secondary' }}>Failed to load products.</Typography>
      </Box>
    );
  }

  return (
    <>
      <ProductHero
        title={data.bannerTitle}
        subtitle={data.bannerSubtitle}
        bannerImage={data.bannerImage}
      />

      <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 10 }, px: { xs: 3, md: 8 } }}>
        <Box sx={{ maxWidth: '1280px', mx: 'auto' }}>
          <Grid container spacing={3}>
            {data.products.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                <ProductCard
                  {...product}
                  onClick={(productId) => router.push(`/products/${id}/${productId}`)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}