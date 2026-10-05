'use client';

import {
  Box,
  Chip,
  Container,
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@mui/material';
import Link from 'next/link';
import Reveal from '@/Common/Reveal';
import MagneticWrap from '@/Common/MagneticWrap';
import PageBreadcrumbs from '@/Common/PageBreadcrumbs';

interface BlogSection {
  heading: string | null;
  body: string;
  image?: string;
  imageCaption?: string;
}

interface BlogFaq {
  q: string;
  a: string;
}

interface BlogCta {
  heading: string;
  /** Supports inline [label](/path) links. */
  body: string;
  /** Label for a primary button linking to /contact. */
  contactLabel?: string;
  email: string;
  phone: string;
}

export interface BlogData {
  slug: string;
  title: string;
  seoTitle?: string;
  titleOverride?: string;
  date: string;
  category: string;
  heroImage: string;
  excerpt: string;
  metaDescription?: string;
  tags: string[];
  sections: BlogSection[];
  faq?: BlogFaq[];
  cta?: BlogCta;
  /** Extra schema.org nodes for this post's JSON-LD @graph (WebPage/Service/Organization etc). A FAQPage node is added automatically from `faq` if present. */
  jsonLd?: object[];
}

const ChevronIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderInline(text: string) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const [, label, href] = match;
    nodes.push(
      <Link key={key++} href={href} style={{ color: 'inherit', textDecorationColor: 'currentColor' }}>
        {label}
      </Link>
    );
    lastIndex = LINK_PATTERN.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function renderBody(body: string) {
  return body.split('\n').map((line, i) => {
    if (!line.trim()) return null;
    if (line.startsWith('•')) {
      return (
        <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 1 }}>
          <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: 'primary.main', flexShrink: 0, mt: '10px' }} />
          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1rem' }}>
            {renderInline(line.replace('• ', ''))}
          </Typography>
        </Box>
      );
    }
    return (
      <Typography key={i} variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.9, fontSize: '1rem', mb: 2 }}>
        {renderInline(line)}
      </Typography>
    );
  });
}

/** Up to 3 other posts linked at the end of each article, newest first. */
export interface RelatedPost {
  slug: string;
  title: string;
  category: string;
}

export default function BlogPost({ blog, related = [] }: { blog: BlogData; related?: RelatedPost[] }) {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>

      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 340, md: 500 },
          overflow: 'hidden',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          component="img"
          src={blog.heroImage}
          alt={blog.title}
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(74,18,6,0.75) 0%, rgba(74,18,6,0.3) 60%, rgba(74,18,6,0.1) 100%)' }} />
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            px: { xs: 3, md: 8 },
            pb: { xs: 4, md: 6 },
            maxWidth: 900,
            mx: 'auto',
          }}
        >
          <Reveal>
            <PageBreadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'News', href: '/news' },
                { label: blog.title },
              ]}
              tone="onDark"
              sx={{ mb: 2.5, '& .MuiBreadcrumbs-li:last-of-type': { maxWidth: { xs: 220, md: 420 } }, '& .MuiBreadcrumbs-li:last-of-type p': { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }}
            />
            <Chip
              label={blog.category}
              size="small"
              sx={{ mb: 2, fontWeight: 600, borderRadius: 0, width: 'fit-content', bgcolor: 'primary.main', color: 'primary.contrastText' }}
            />
            <Typography component="h1" variant="h2" sx={{ fontWeight: 700, color: '#fff', lineHeight: 1.15, mb: 1.5, fontSize: { xs: '1.8rem', md: '2.8rem' } }}>
              {blog.title}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              {blog.date}
            </Typography>
          </Reveal>
        </Box>
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>

        <Reveal>
        {/* Excerpt */}
        <Typography
          component="p"
          variant="h6"
          sx={{ fontWeight: 400, color: 'text.primary', lineHeight: 1.75, mb: 5, fontSize: '1.15rem', borderLeft: '3px solid', borderColor: 'primary.main', pl: 3 }}
        >
          {blog.excerpt}
        </Typography>

        <Divider sx={{ mb: 5 }} />

        {/* Sections */}
        {blog.sections.map((section, i) => (
          <Box key={i} sx={{ mb: 5 }}>
            {section.heading && (
              <Typography component="h2" variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 2.5, fontSize: { xs: '1.3rem', md: '1.6rem' } }}>
                {section.heading}
              </Typography>
            )}
            {renderBody(section.body)}

            {section.image && (
              <Box sx={{ mt: 3 }}>
                <Box
                  component="img"
                  src={section.image}
                  alt={section.imageCaption || blog.title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                />
                {section.imageCaption && (
                  <Typography
                    variant="caption"
                    sx={{ display: 'block', color: 'text.disabled', mt: 1, fontSize: '0.75rem' }}
                  >
                    {section.imageCaption}
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        ))}

        {/* FAQ */}
        {blog.faq && blog.faq.length > 0 && (
          <Box sx={{ mt: 6, mb: 6 }}>
            <Typography component="h2" variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 3, fontSize: { xs: '1.3rem', md: '1.6rem' } }}>
              Frequently Asked Questions
            </Typography>
            {blog.faq.map((item, i) => (
              <Accordion
                key={i}
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '0 !important',
                  mb: 1.5,
                  '&:before': { display: 'none' },
                }}
              >
                <AccordionSummary expandIcon={<ChevronIcon />}>
                  <Typography component="h3" sx={{ fontWeight: 600, fontSize: '0.95rem', color: 'text.primary' }}>
                    {item.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.75 }}>
                    {item.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}

        {/* Tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 6 }}>
          {blog.tags.map((t) => (
            <Chip key={t} label={t} size="small" variant="outlined" sx={{ borderRadius: 0, fontSize: '0.75rem' }} />
          ))}
        </Box>
        </Reveal>

        <Divider sx={{ mb: 6 }} />

        {/* More articles: links every post from the others, not just /news. */}
        {related.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'primary.main', mb: 2 }}>
              More articles
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
              {related.map((post) => (
                <Box
                  key={post.slug}
                  component={Link}
                  href={`/news/${post.slug}`}
                  sx={{
                    display: 'block',
                    p: 2.5,
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    color: 'text.primary',
                    transition: 'border-color 0.2s ease',
                    '&:hover': { borderColor: 'primary.main' },
                  }}
                >
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mb: 0.5 }}>{post.category}</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.4 }}>{post.title}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* CTA */}
        {blog.cta && (
          <Box
            sx={{
              bgcolor: 'primary.dark',
              p: { xs: 4, md: 6 },
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { md: 'center' },
              justifyContent: 'space-between',
              gap: 4,
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff', mb: 1 }}>
                {blog.cta.heading}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, maxWidth: 420 }}>
                {renderInline(blog.cta.body)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flexShrink: 0 }}>
              {blog.cta.contactLabel && (
                <MagneticWrap>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    href="/contact"
                    sx={{ borderRadius: 0, px: 3, py: 1.25, fontWeight: 600, textTransform: 'none', width: '100%' }}
                  >
                    {blog.cta.contactLabel}
                  </Button>
                </MagneticWrap>
              )}
              <MagneticWrap>
                <Button
                  variant={blog.cta.contactLabel ? 'outlined' : 'contained'}
                  color="primary"
                  component="a"
                  href={`mailto:${blog.cta.email}`}
                  sx={{ borderRadius: 0, px: 3, py: 1.25, fontWeight: 600, textTransform: 'none' }}
                >
                  {blog.cta.email}
                </Button>
              </MagneticWrap>
              <Button
                variant="outlined"
                component="a"
                href={`tel:${blog.cta.phone.replace(/\s/g, '')}`}
                sx={{ borderRadius: 0, px: 3, py: 1.25, fontWeight: 600, textTransform: 'none', borderColor: 'rgba(255,255,255,0.3)', color: '#fff', '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.08)' } }}
              >
                {blog.cta.phone}
              </Button>
            </Box>
          </Box>
        )}

      </Container>
    </Box>
  );
}