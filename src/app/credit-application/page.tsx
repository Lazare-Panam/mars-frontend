import type { Metadata } from 'next';
import { Box, Container, Typography } from '@mui/material';
import PageBreadcrumbs from '@/Common/PageBreadcrumbs';
import { JsonLd, breadcrumbList } from '@/lib/jsonLd';
import CreditApplicationForm from './CreditApplicationForm';

export const metadata: Metadata = {
  title: 'Credit Line Application',
  description:
    'Apply for a trade credit account with Mars Valvenok, authorised UK distributor of MARS ball valves. Treated in strict confidence.',
  alternates: { canonical: '/credit-application' },
};

const crumbs = breadcrumbList([
  { name: 'Home', path: '/' },
  { name: 'Credit Application', path: '/credit-application' },
]);

export default function CreditApplicationPage() {
  return (
    <Box component="main" sx={{ bgcolor: 'background.default', py: { xs: 4, md: 6 } }}>
      <JsonLd data={crumbs} />
      <Container maxWidth="md">
        <PageBreadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Credit Application' }]}
          sx={{ mb: { xs: 4, md: 6 } }}
        />

        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography
            component="h1"
            sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, fontWeight: 800, color: 'primary.main', mb: 1.5 }}
          >
            Credit Line Application
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '1.05rem' }}>
            Complete this short form so we can assess your credit facility. Treated in strict confidence.
          </Typography>
        </Box>

        <CreditApplicationForm />
      </Container>
    </Box>
  );
}
