import { Box, Typography, Grid } from '@mui/material';
import ProductCategoryRow from './ProductCategoryRow';
import CollapsibleSection from './CollapsibleSection';
import { CATEGORIES, SERIES } from '../data/categories';
import Reveal from '@/Common/Reveal';

/**
 * The "Mars Ball Valves" (by series) and "Categories" sections. Shared by
 * /products and the homepage, so both always show the same range.
 */
export default function ProductRangeSections() {
  return (
    <>
      {/* By Series — collapsible; white bg to contrast the tinted sections around it */}
      <Box sx={{ bgcolor: '#fff', py: { xs: 6, md: 10 }, px: { xs: 3, md: 8 } }}>
        <Box sx={{ maxWidth: '1280px', mx: 'auto' }}>
          <CollapsibleSection title="Mars Ball Valves">
            <Grid container rowSpacing={{ xs: 6, md: 9 }} columnSpacing={{ xs: 4, md: 8 }}>
              {SERIES.map((s, i) => (
                <Grid size={{ xs: 12, md: 6 }} key={s.id}>
                  <Reveal delay={Math.min(i * 60, 400)}>
                    <ProductCategoryRow {...s} />
                  </Reveal>
                </Grid>
              ))}
            </Grid>
          </CollapsibleSection>
        </Box>
      </Box>

      {/* Mars Ball Valves — 2-up grid, each cell: text left + image right */}
      <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 10 }, px: { xs: 3, md: 8 } }}>
        <Box sx={{ maxWidth: '1280px', mx: 'auto' }}>
          <Reveal>
            <Typography
              component="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.6rem', md: '2rem' },
                letterSpacing: '-0.02em',
                mb: { xs: 4, md: 6 },
              }}
            >
              Categories
            </Typography>
          </Reveal>
          <Grid container rowSpacing={{ xs: 6, md: 9 }} columnSpacing={{ xs: 4, md: 8 }}>
            {CATEGORIES.map((cat, i) => (
              <Grid size={{ xs: 12, md: 6 }} key={cat.id}>
                <Reveal delay={Math.min(i * 60, 400)}>
                  <ProductCategoryRow {...cat} />
                </Reveal>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
