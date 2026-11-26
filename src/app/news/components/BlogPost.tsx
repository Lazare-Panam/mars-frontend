'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@mui/material';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import LinkIcon from '@mui/icons-material/Link';
import Reveal from '@/Common/Reveal';
import MagneticWrap from '@/Common/MagneticWrap';
import PageBreadcrumbs from '@/Common/PageBreadcrumbs';
import { KRONOX, LIGHT_BANNER } from "@/theme/brand";

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
      <Link key={key++} href={href} style={{ color: '#E0393E', fontWeight: 600, textDecorationColor: 'rgba(224,57,62,0.4)', textUnderlineOffset: 3 }}>
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
        <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 1.25 }}>
          <Box sx={{ width: 12, height: 7, bgcolor: 'primary.main', flexShrink: 0, mt: '11px', clipPath: 'polygon(40% 0, 100% 0, 60% 100%, 0 100%)' }} />
          <Typography className="no-capitalize" variant="body1" sx={{ color: KRONOX.text, lineHeight: 1.8, fontSize: '1.05rem' }}>
            {renderInline(line.replace('• ', ''))}
          </Typography>
        </Box>
      );
    }
    return (
      <Typography key={i} className="no-capitalize" variant="body1" sx={{ color: '#4A4D52', lineHeight: 1.9, fontSize: '1.05rem', mb: 2.25 }}>
        {renderInline(line)}
      </Typography>
    );
  });
}

/** Up to 3 other posts linked at the end of each article. */
export interface RelatedPost {
  slug: string;
  title: string;
  category: string;
  heroImage?: string;
  date?: string;
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function readMins(blog: BlogData) {
  const words = [blog.excerpt, ...blog.sections.map((s) => `${s.heading ?? ''} ${s.body}`)].join(' ').split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 200));
}

function Slash({ w = 28, h = 14 }: { w?: number; h?: number }) {
  return <Box aria-hidden sx={{ width: w, height: h, flexShrink: 0, bgcolor: 'primary.main', clipPath: 'polygon(45% 0, 100% 0, 55% 100%, 0 100%)' }} />;
}

function Tag({ label }: { label: string }) {
  return (
    <Box
      component="span"
      sx={{ display: 'inline-block', alignSelf: 'flex-start', bgcolor: 'primary.main', color: '#fff', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', px: 1.5, py: 0.6, clipPath: 'polygon(6px 0, 100% 0, calc(100% - 6px) 100%, 0 100%)' }}
    >
      {label}
    </Box>
  );
}

function CopyLink() {
  const [done, setDone] = useState(false);
  return (
    <Box
      component="button"
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(window.location.href).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 2000);
        }).catch(() => {});
      }}
      sx={{ cursor: 'pointer', font: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 1, width: '100%', justifyContent: 'center', py: 1.1, border: `1px solid ${KRONOX.line}`, borderRadius: '3px', bgcolor: '#fff', color: KRONOX.text, fontWeight: 700, fontSize: '0.85rem', transition: 'all 0.15s ease', '&:hover': { borderColor: KRONOX.red, color: KRONOX.red } }}
    >
      <LinkIcon sx={{ fontSize: 18 }} />
      {done ? 'Link copied' : 'Copy link to article'}
    </Box>
  );
}

export default function BlogPost({ blog, related = [] }: { blog: BlogData; related?: RelatedPost[] }) {
  const toc = blog.sections.filter((s) => s.heading).map((s) => ({ id: slugify(s.heading as string), label: s.heading as string }));
  const [open, setOpen] = useState<number | false>(0);
  const phone = blog.cta?.phone ?? '+44 7368 137917';
  const email = blog.cta?.email ?? 'sales@kronoxvalve.com';

  return (
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh' }}>
      {/* Hero: title on the left, banner on the right */}
      <Box sx={{ ...LIGHT_BANNER, py: { xs: 5, md: 7 } }}>
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '6fr 5fr' }, gap: { xs: 4, md: 6 }, alignItems: 'center' }}>
            <Reveal>
              <Box>
                <PageBreadcrumbs
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'News', href: '/news' },
                    { label: blog.title },
                  ]}
                  sx={{ mb: 3, '& .MuiBreadcrumbs-li:last-of-type': { maxWidth: { xs: 200, md: 300 } }, '& .MuiBreadcrumbs-li:last-of-type p': { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }}
                />
                <Tag label={blog.category} />
                <Typography component="h1" sx={{ fontWeight: 800, color: KRONOX.text, lineHeight: 1.12, letterSpacing: '-0.02em', mt: 2, mb: 2.5, fontSize: { xs: '1.9rem', md: '2.7rem' } }}>
                  {blog.title}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: { xs: 1.5, md: 2.5 }, color: KRONOX.steel, fontSize: '0.88rem' }}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 30, height: 30, borderRadius: '50%', bgcolor: 'primary.main', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '0.7rem' }}>KX</Box>
                    <Box component="span" sx={{ fontWeight: 700, color: KRONOX.text }}>Kronox Valves</Box>
                  </Box>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6 }}>
                    <CalendarTodayOutlinedIcon sx={{ fontSize: 16 }} /> {blog.date}
                  </Box>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6 }}>
                    <ScheduleIcon sx={{ fontSize: 17 }} /> {readMins(blog)} min read
                  </Box>
                </Box>
              </Box>
            </Reveal>
            <Reveal delay={120}>
              <Box
                component="img"
                src={blog.heroImage}
                alt={blog.title}
                sx={{ display: 'block', width: '100%', height: 'auto', maxHeight: 520, objectFit: 'contain', borderRadius: '6px', bgcolor: '#fff', boxShadow: '0 30px 60px rgba(58,61,66,0.18)', border: '6px solid #fff' }}
              />
            </Reveal>
          </Box>
        </Container>
      </Box>

      {/* Body + sidebar */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 300px' }, gap: { xs: 5, md: 7 }, alignItems: 'start' }}>
          {/* Article */}
          <Box component="article" sx={{ maxWidth: 760, minWidth: 0 }}>
            <Box sx={{ bgcolor: '#FBEBEC', borderLeft: `4px solid ${KRONOX.red}`, p: { xs: 2.5, md: 3.5 }, mb: 5, borderRadius: '0 6px 6px 0' }}>
              <Typography className="no-capitalize" sx={{ color: KRONOX.text, fontSize: { xs: '1.1rem', md: '1.22rem' }, lineHeight: 1.7, fontWeight: 500 }}>
                {blog.excerpt}
              </Typography>
            </Box>

            {blog.sections.map((section, i) => (
              <Box key={i} id={section.heading ? slugify(section.heading) : undefined} sx={{ mb: 5, scrollMarginTop: 140 }}>
                {section.heading && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                    <Slash />
                    <Typography component="h2" sx={{ fontWeight: 800, color: KRONOX.text, fontSize: { xs: '1.35rem', md: '1.65rem' }, lineHeight: 1.25 }}>
                      {section.heading}
                    </Typography>
                  </Box>
                )}
                {renderBody(section.body)}
                {section.image && (
                  <Box component="figure" sx={{ m: 0, mt: 3 }}>
                    <Box
                      component="img"
                      src={section.image}
                      alt={section.imageCaption || blog.title}
                      sx={{ width: '100%', height: 'auto', display: 'block', borderRadius: '6px', border: `1px solid ${KRONOX.line}`, bgcolor: '#fff' }}
                    />
                    {section.imageCaption && (
                      <Typography component="figcaption" className="no-capitalize" sx={{ color: KRONOX.steel, mt: 1.25, fontSize: '0.82rem', pl: 1.5, borderLeft: `2px solid ${KRONOX.red}` }}>
                        {section.imageCaption}
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
            ))}

            {/* FAQ */}
            {blog.faq && blog.faq.length > 0 && (
              <Box sx={{ mt: 7, mb: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <Slash />
                  <Typography component="h2" sx={{ fontWeight: 800, color: KRONOX.text, fontSize: { xs: '1.35rem', md: '1.65rem' } }}>
                    Frequently asked questions
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {blog.faq.map((item, i) => {
                    const isOpen = open === i;
                    return (
                      <Accordion
                        key={i}
                        expanded={isOpen}
                        onChange={() => setOpen(isOpen ? false : i)}
                        disableGutters
                        elevation={0}
                        sx={{
                          border: `1px solid ${isOpen ? 'rgba(224,57,62,0.45)' : KRONOX.line}`,
                          borderRadius: '4px !important',
                          overflow: 'hidden',
                          '&:before': { display: 'none' },
                          boxShadow: isOpen ? '0 12px 28px rgba(58,61,66,0.08)' : 'none',
                          borderLeft: isOpen ? `4px solid ${KRONOX.red}` : undefined,
                        }}
                      >
                        <AccordionSummary sx={{ px: 2.5, '& .MuiAccordionSummary-content': { alignItems: 'center', gap: 2 } }}>
                          <Typography component="h3" sx={{ flex: 1, fontWeight: 700, fontSize: '1rem', color: KRONOX.text }}>
                            {item.q}
                          </Typography>
                          <Box sx={{ width: 30, height: 30, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', border: `1.5px solid ${isOpen ? KRONOX.red : KRONOX.line}`, bgcolor: isOpen ? 'primary.main' : 'transparent', color: isOpen ? '#fff' : 'primary.main', transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'all 0.25s ease' }}>
                            <AddIcon sx={{ fontSize: 18 }} />
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 2.5, pt: 0, pb: 2.5 }}>
                          <Typography className="no-capitalize" sx={{ color: '#4A4D52', lineHeight: 1.8 }}>
                            {item.a}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Box>
              </Box>
            )}

            {/* Tags */}
            {blog.tags.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, pt: 3, borderTop: `1px solid ${KRONOX.line}` }}>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', color: KRONOX.steel, mr: 1 }}>TAGS</Typography>
                {blog.tags.map((t) => (
                  <Box key={t} component="span" className="no-capitalize" sx={{ fontSize: '0.8rem', fontWeight: 600, color: KRONOX.text, px: 1.5, py: 0.5, borderRadius: '999px', border: `1px solid ${KRONOX.line}`, bgcolor: '#F5F5F6' }}>
                    {t}
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          {/* Sidebar */}
          <Box component="aside" sx={{ position: { md: 'sticky' }, top: { md: 140 }, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {toc.length > 1 && (
              <Box sx={{ border: `1px solid ${KRONOX.line}`, borderRadius: '6px', p: 2.5 }}>
                <Typography sx={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.14em', color: 'primary.main', mb: 1.5 }}>IN THIS ARTICLE</Typography>
                <Box component="ol" sx={{ m: 0, p: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                  {toc.map((t, i) => (
                    <Box component="li" key={t.id}>
                      <Box
                        component="a"
                        href={`#${t.id}`}
                        sx={{ display: 'flex', gap: 1.25, py: 0.75, px: 1, mx: -1, borderRadius: '3px', textDecoration: 'none', color: KRONOX.text, fontSize: '0.88rem', lineHeight: 1.4, transition: 'all 0.15s ease', '&:hover': { bgcolor: '#FBEBEC', color: 'primary.main' } }}
                      >
                        <Box component="span" sx={{ color: 'primary.main', fontWeight: 800, minWidth: 18 }}>{String(i + 1).padStart(2, '0')}</Box>
                        {t.label}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '6px', p: 3, color: '#fff', background: 'linear-gradient(135deg, #E0393E 0%, #C42E33 100%)' }}>
              <Box aria-hidden sx={{ position: 'absolute', top: 0, right: -10, width: 110, height: '100%', bgcolor: 'rgba(255,255,255,0.12)', clipPath: 'polygon(60% 0, 100% 0, 40% 100%, 0 100%)' }} />
              <Typography sx={{ position: 'relative', fontWeight: 800, fontSize: '1.15rem', mb: 0.75 }}>Talk to our team</Typography>
              <Typography className="no-capitalize" sx={{ position: 'relative', fontSize: '0.88rem', opacity: 0.92, mb: 2.25, lineHeight: 1.6 }}>
                Send your size, pressure and media. We reply with the right series and a price.
              </Typography>
              <Box component={Link} href="/contact#enquiry" sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, bgcolor: '#fff', color: 'primary.main', fontWeight: 800, py: 1.2, borderRadius: '3px', textDecoration: 'none', mb: 1.5 }}>
                Request a quote <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </Box>
              <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 0.75, fontSize: '0.85rem' }}>
                <Box component="a" href={`tel:${phone.replace(/\s/g, '')}`} sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: '#fff', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  <PhoneOutlinedIcon sx={{ fontSize: 17 }} /> {phone}
                </Box>
                <Box component="a" href={`mailto:${email}`} sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: '#fff', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                  <MailOutlineIcon sx={{ fontSize: 17 }} /> {email}
                </Box>
              </Box>
            </Box>

            <CopyLink />
          </Box>
        </Box>

        {/* CTA */}
        {blog.cta && (
          <Box
            sx={{
              mt: { xs: 6, md: 8 },
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '6px',
              bgcolor: '#FBEBEC',
              border: '1px solid rgba(224,57,62,0.2)',
              p: { xs: 3.5, md: 5 },
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { md: 'center' },
              justifyContent: 'space-between',
              gap: 4,
            }}
          >
            <Box aria-hidden sx={{ position: 'absolute', top: 0, right: 0, width: { xs: 0, md: 260 }, height: '100%', bgcolor: KRONOX.red, clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0 100%)', opacity: 0.12 }} />
            <Box sx={{ position: 'relative', maxWidth: 560 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <Slash />
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.16em', color: 'primary.main' }}>NEXT STEP</Typography>
              </Box>
              <Typography sx={{ fontWeight: 800, color: KRONOX.text, fontSize: { xs: '1.4rem', md: '1.8rem' }, mb: 1, lineHeight: 1.2 }}>
                {blog.cta.heading}
              </Typography>
              <Typography className="no-capitalize" sx={{ color: '#4A4D52', lineHeight: 1.75 }}>
                {renderInline(blog.cta.body)}
              </Typography>
            </Box>
            <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 1.25, flexShrink: 0, minWidth: { md: 260 } }}>
              <MagneticWrap>
                <Button
                  variant="contained"
                  component={Link}
                  href="/contact"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ borderRadius: '3px', px: 3, py: 1.3, fontWeight: 800, textTransform: 'none', width: '100%', boxShadow: '0 10px 24px rgba(224,57,62,0.3)' }}
                >
                  {blog.cta.contactLabel ?? 'Contact our team'}
                </Button>
              </MagneticWrap>
              <Button component="a" href={`mailto:${blog.cta.email}`} startIcon={<MailOutlineIcon />} sx={{ borderRadius: '3px', px: 3, py: 1.1, fontWeight: 700, textTransform: 'none', color: KRONOX.text, bgcolor: '#fff', border: `1px solid ${KRONOX.line}`, '&:hover': { borderColor: KRONOX.red, color: KRONOX.red, bgcolor: '#fff' } }}>
                {blog.cta.email}
              </Button>
              <Button component="a" href={`tel:${blog.cta.phone.replace(/\s/g, '')}`} startIcon={<PhoneOutlinedIcon />} sx={{ borderRadius: '3px', px: 3, py: 1.1, fontWeight: 700, textTransform: 'none', color: KRONOX.text, bgcolor: '#fff', border: `1px solid ${KRONOX.line}`, '&:hover': { borderColor: KRONOX.red, color: KRONOX.red, bgcolor: '#fff' } }}>
                {blog.cta.phone}
              </Button>
            </Box>
          </Box>
        )}

        {/* Related */}
        {related.length > 0 && (
          <Box sx={{ mt: { xs: 7, md: 9 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2, mb: 3 }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Slash />
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.16em', color: 'primary.main' }}>KEEP READING</Typography>
                </Box>
                <Typography component="h2" sx={{ fontWeight: 800, color: KRONOX.text, fontSize: { xs: '1.4rem', md: '1.7rem' } }}>More articles</Typography>
              </Box>
              <Box component={Link} href="/news" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, color: 'primary.main', fontWeight: 800, fontSize: '0.9rem', textDecoration: 'none', '&:hover': { gap: 1.25 }, transition: 'gap 0.2s ease' }}>
                All news <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </Box>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
              {related.map((post) => (
                <Box
                  key={post.slug}
                  component={Link}
                  href={`/news/${post.slug}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    border: `1px solid ${KRONOX.line}`,
                    borderRadius: '6px',
                    overflow: 'hidden',
                    bgcolor: '#fff',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                    '&:hover': { transform: 'translateY(-4px)', borderColor: 'rgba(224,57,62,0.5)', boxShadow: '0 18px 40px rgba(58,61,66,0.12)' },
                    '&:hover .rel-img': { transform: 'scale(1.05)' },
                    '&:hover .rel-title': { color: 'primary.main' },
                  }}
                >
                  {post.heroImage && (
                    <Box sx={{ overflow: 'hidden', aspectRatio: '16 / 9', bgcolor: '#FBEBEC' }}>
                      <Box component="img" className="rel-img" src={post.heroImage} alt={post.title} loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', transition: 'transform 0.5s ease' }} />
                    </Box>
                  )}
                  <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                    <Tag label={post.category} />
                    <Typography className="rel-title" sx={{ fontWeight: 800, fontSize: '1rem', lineHeight: 1.35, color: KRONOX.text, transition: 'color 0.2s ease' }}>
                      {post.title}
                    </Typography>
                    {post.date && <Typography sx={{ color: KRONOX.steel, fontSize: '0.8rem' }}>{post.date}</Typography>}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
