'use client';

import * as React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Grid,
  Grow,
} from '@mui/material';
import { useSubmitEnquiry } from '@/api/useSubmitEnquiry';
import { quoteMessage, cartQuoteMessage } from '@/lib/quote';
import { useQuoteStore } from '@/store/useQuoteStore';
import Reveal from '@/Common/Reveal';
import MagneticWrap from '@/Common/MagneticWrap';

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

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    transition: 'box-shadow 0.2s ease',
  },
  '& .MuiOutlinedInput-root.Mui-focused': {
    boxShadow: '0 0 0 4px rgba(231,57,15,0.12)',
  },
};

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

    // The enquiry API has no product field, so the part number rides at the
    // top of the message.
    const { product, ...rest } = formData;
    const payload = product.trim()
      ? { ...rest, message: `Product / part number: ${product.trim()}\n\n${rest.message}` }
      : rest;

    mutate(payload, {
      onSuccess: () => {
        setFormData(initialFormState);
      },
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        maxWidth: 900,
        p: { xs: 4, md: 6 },
        border: '1px solid',
        borderColor: 'primary.light',
        borderRadius: 2,
      }}
    >
      <Reveal>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }} gutterBottom>
          {sku ? 'Request a quote' : 'Send your enquiry'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {sku
            ? `Add your details and quantity for ${sku} and our team will send you a price shortly.`
            : 'Fill in your details and requirements and our team will get back to you.'}
        </Typography>
      </Reveal>

      <Grow in={isSuccess} unmountOnExit>
        <Alert severity="success" sx={{ mb: 3 }} onClose={reset}>
          Thanks — your enquiry has been received. We'll be in touch soon.
        </Alert>
      </Grow>
      <Grow in={isError} unmountOnExit>
        <Alert severity="error" sx={{ mb: 3 }} onClose={reset}>
          Something went wrong submitting your enquiry. Please try again.
        </Alert>
      </Grow>

      <Reveal delay={150}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Name"
              value={formData.userName}
              onChange={handleChange('userName')}
              error={!!errors.userName}
              helperText={errors.userName}
              disabled={isPending}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.userEmail}
              onChange={handleChange('userEmail')}
              error={!!errors.userEmail}
              helperText={errors.userEmail}
              disabled={isPending}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Company"
              value={formData.userCompany}
              onChange={handleChange('userCompany')}
              error={!!errors.userCompany}
              helperText={errors.userCompany}
              disabled={isPending}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Country"
              value={formData.userCountry}
              onChange={handleChange('userCountry')}
              disabled={isPending}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Product or part number (optional)"
              value={formData.product}
              onChange={handleChange('product')}
              disabled={isPending}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Message"
              value={formData.message}
              onChange={handleChange('message')}
              error={!!errors.message}
              helperText={errors.message}
              multiline
              minRows={5}
              disabled={isPending}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={12}>
            {/* flex column wrapper: MagneticWrap renders an inline-block Box,
                which would let the fullWidth Button's width:100% collapse to
                its intrinsic size. As a flex item in a column flex container
                it gets blockified and stretched to full width instead. */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <MagneticWrap strength={0.15}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled={isPending}
                  sx={{
                    py: 1.5,
                    transition: 'background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': { transform: 'translateY(-2px)' },
                  }}
                >
                  {isPending ? <CircularProgress size={24} color="inherit" /> : 'Submit Enquiry'}
                </Button>
              </MagneticWrap>
            </Box>
          </Grid>
        </Grid>
      </Box>
      </Reveal>
    </Paper>
  );
}