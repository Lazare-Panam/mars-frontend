'use client';

import * as React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Grid,
  Grow,
  InputAdornment,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useSubmitEnquiry } from '@/api/useSubmitEnquiry';
import { quoteMessage, cartQuoteMessage } from '@/lib/quote';
import { useQuoteStore } from '@/store/useQuoteStore';

// Public Turnstile site key. Hardcoded fallback mirrors axiosClient/site.ts: the
// Static Web Apps build has no .env, so NEXT_PUBLIC_* vars need a default here or
// the widget won't render in prod. Safe to hardcode — the site key is public.
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '0x4AAAAAAFwfb1up9rSC3yQN';

interface EnquiryFormData {
  userName: string;
  userEmail: string;
  userCompany: string;
  userCountry: string;
  product: string;
  message: string;
}

const initialFormState: EnquiryFormData = {
  userName: '',
  userEmail: '',
  userCompany: '',
  userCountry: '',
  product: '',
  message: '',
};

const MAX_MESSAGE = 5000;

// Labels sit above soft filled inputs; the outline only appears on focus.
const fieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: '#F5F5F6',
    borderRadius: '10px',
    transition: 'box-shadow 0.2s ease, background-color 0.2s ease',
    '& fieldset': { borderColor: 'transparent' },
    '&:hover fieldset': { borderColor: 'rgba(58,61,66,0.15)' },
    '&.Mui-focused': { bgcolor: '#fff', boxShadow: '0 0 0 4px rgba(224,57,62,0.12)' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: '1.5px' },
  },
  '& .MuiInputBase-input::placeholder': { color: 'text.secondary', opacity: 0.7 },
};

function FieldLabel({ children, required, hint }: { children: React.ReactNode; required?: boolean; hint?: string }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.75 }}>
      <Typography component="span" sx={{ fontSize: '0.88rem', fontWeight: 700, color: 'text.primary' }}>
        {children}
        {required && <Box component="span" sx={{ color: 'primary.main', ml: 0.25 }}>*</Box>}
      </Typography>
      {hint && <Typography component="span" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{hint}</Typography>}
    </Box>
  );
}

const icon = (Icon: typeof PersonOutlineIcon) => ({
  startAdornment: (
    <InputAdornment position="start">
      <Icon sx={{ fontSize: 19, color: 'text.secondary' }} />
    </InputAdornment>
  ),
});

export default function ContactForm() {
  // Arriving from a "Request quote" button: the part number is handed over in
  // memory (useQuoteStore), not the URL. Pre-fill the message once, then clear
  // the store so a later visit to /contact starts blank. Still fully editable.
  const clearQuote = useQuoteStore((s) => s.clear);
  const [quote] = React.useState(() => useQuoteStore.getState().request);
  const sku = quote?.sku ?? '';
  // A cart hand-off carries every line in `items`; a single product page
  // hand-off carries just `sku`/`product`. Pre-fill the matching message and
  // leave the single "product" field blank for carts (the parts are already
  // itemized in the message body).
  const cartLines = quote?.items ?? null;
  const [formData, setFormData] = React.useState<EnquiryFormData>(() => {
    if (cartLines && cartLines.length > 0) {
      return { ...initialFormState, product: '', message: cartQuoteMessage(cartLines) };
    }
    if (quote) {
      return { ...initialFormState, product: quote.sku, message: quoteMessage(quote.sku, quote.product) };
    }
    return initialFormState;
  });
  React.useEffect(() => {
    if (quote) clearQuote();
  }, [quote, clearQuote]);
  const [errors, setErrors] = React.useState<Partial<Record<keyof EnquiryFormData, string>>>({});

  // Turnstile token + a ref to the widget so we can reset it (tokens are single-use).
  const [captchaToken, setCaptchaToken] = React.useState('');
  const turnstileRef = React.useRef<TurnstileInstance>(null);

  const { mutate, isPending, isSuccess, isError, reset } = useSubmitEnquiry();

  const handleChange = (field: keyof EnquiryFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EnquiryFormData, string>> = {};

    if (!formData.userName.trim()) newErrors.userName = 'Name is required';
    if (!formData.userEmail.trim()) {
      newErrors.userEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) {
      newErrors.userEmail = 'Enter a valid email address';
    }
    if (!formData.userCompany.trim()) newErrors.userCompany = 'Company is required';
    if (!formData.message.trim()) newErrors.message = 'Please describe your enquiry';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!captchaToken) return; // Button is disabled without a token; guard anyway.

    // The enquiry API has no product field, so the part number rides at the
    // top of the message.
    const { product, ...rest } = formData;
    const base = product.trim()
      ? { ...rest, message: `Product / part number: ${product.trim()}\n\n${rest.message}` }
      : rest;

    mutate({ ...base, captchaToken }, {
      onSuccess: () => {
        setFormData(initialFormState);
      },
      // A token is single-use: whether the submit succeeded or failed, the old
      // one is spent, so clear it and get a fresh challenge.
      onSettled: () => {
        setCaptchaToken('');
        turnstileRef.current?.reset();
      },
    });
  };

  const field = (
    key: keyof EnquiryFormData,
    opts: { label: string; placeholder: string; required?: boolean; hint?: string; Icon?: typeof PersonOutlineIcon; type?: string },
  ) => (
    <>
      <FieldLabel required={opts.required} hint={opts.hint}>{opts.label}</FieldLabel>
      <TextField
        fullWidth
        type={opts.type}
        placeholder={opts.placeholder}
        value={formData[key]}
        onChange={handleChange(key)}
        error={!!errors[key]}
        helperText={errors[key]}
        disabled={isPending}
        slotProps={{ input: opts.Icon ? icon(opts.Icon) : undefined }}
        sx={fieldSx}
      />
    </>
  );

  return (
    <Box>
      <Typography component="h2" sx={{ fontSize: { xs: '1.6rem', md: '1.9rem' }, fontWeight: 800, letterSpacing: '-0.01em', mb: 0.75 }}>
        {sku ? 'Request a quote' : 'Send your enquiry'}
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 3.5 }}>
        {sku
          ? `Add your details and quantity for ${sku} and our team will send you a price.`
          : 'Fill in your details and requirements. Fields marked * are required.'}
      </Typography>

      <Grow in={isSuccess} unmountOnExit>
        <Alert severity="success" sx={{ mb: 3, borderRadius: '10px' }} onClose={reset}>
          Thanks, your enquiry has been received. We&apos;ll be in touch soon.
        </Alert>
      </Grow>
      <Grow in={isError} unmountOnExit>
        <Alert severity="error" sx={{ mb: 3, borderRadius: '10px' }} onClose={reset}>
          Something went wrong submitting your enquiry. Please try again.
        </Alert>
      </Grow>

      <Box component="form" id="contact-enquiry" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>{field('userName', { label: 'Name', placeholder: 'Jane Smith', required: true, Icon: PersonOutlineIcon })}</Grid>
          <Grid size={{ xs: 12, md: 6 }}>{field('userEmail', { label: 'Email', placeholder: 'jane@company.com', required: true, Icon: MailOutlineIcon, type: 'email' })}</Grid>
          <Grid size={{ xs: 12, md: 6 }}>{field('userCompany', { label: 'Company', placeholder: 'Company name', required: true, Icon: BusinessOutlinedIcon })}</Grid>
          <Grid size={{ xs: 12, md: 6 }}>{field('userCountry', { label: 'Country', placeholder: 'United Kingdom', Icon: PublicOutlinedIcon })}</Grid>
          <Grid size={12}>{field('product', { label: 'Product or part number', placeholder: 'e.g. KX-77, 1" NPT', hint: 'Optional', Icon: Inventory2OutlinedIcon })}</Grid>
          <Grid size={12}>
            <FieldLabel required>Message</FieldLabel>
            <TextField
              fullWidth
              placeholder="Size, pressure, end connection, media, quantity and anything else that helps us quote."
              value={formData.message}
              onChange={handleChange('message')}
              error={!!errors.message}
              helperText={errors.message}
              multiline
              minRows={5}
              disabled={isPending}
              slotProps={{ htmlInput: { maxLength: MAX_MESSAGE } }}
              sx={fieldSx}
            />
            <Typography sx={{ textAlign: 'right', fontSize: '0.75rem', color: 'text.secondary', mt: 0.75 }}>
              {formData.message.length} / {MAX_MESSAGE}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Turnstile
              ref={turnstileRef}
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={setCaptchaToken}
              onExpire={() => setCaptchaToken('')}
              onError={() => setCaptchaToken('')}
            />
          </Grid>
          <Grid size={12}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'text.secondary', fontSize: '0.82rem' }}>
                <LockOutlinedIcon sx={{ fontSize: 16 }} />
                We only use your details to reply to this enquiry.
              </Box>
              <Button
                type="submit"
                variant="contained"
                disableElevation
                disabled={isPending || !captchaToken}
                endIcon={isPending ? undefined : <ArrowForwardIcon />}
                sx={{
                  px: 3.5,
                  py: 1.4,
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '1rem',
                  boxShadow: '0 10px 24px rgba(224,57,62,0.28)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 14px 30px rgba(224,57,62,0.34)' },
                }}
              >
                {isPending ? <CircularProgress size={22} color="inherit" /> : 'Submit Enquiry'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
