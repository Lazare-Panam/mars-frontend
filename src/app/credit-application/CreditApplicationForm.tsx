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
  MenuItem,
  FormControlLabel,
  Checkbox,
  Divider,
} from '@mui/material';
import {
  useSubmitCreditApplication,
  type CreditLineApplicationRequest,
} from '@/api/useSubmitCreditApplication';
import Reveal from '@/Common/Reveal';
import MagneticWrap from '@/Common/MagneticWrap';

interface CreditFormData {
  registrationNumber: string;
  companyName: string;
  vatNumber: string;
  addressLine1: string;
  addressLine2: string;
  website: string;
  sector: string;
  yearsInBusiness: string;
  employees: string;
  contactName: string;
  jobTitle: string;
  email: string;
  phone: string;
  creditLimitRequested: string;
  paymentTerms: string;
  currency: string;
  monthlyOrderValue: string;
  products: string;
  signatoryName: string;
  signatoryTitle: string;
  signature: string;
  declarationDate: string; // yyyy-mm-dd
  declarationAccepted: boolean;
}

const CURRENCIES = ['GBP', 'USD', 'EUR'] as const;

// Kept in step with the backend CreditLineApplicationValidator.
const MAX_CREDIT_LIMIT = 10_000_000;
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialFormState: CreditFormData = {
  registrationNumber: '',
  companyName: '',
  vatNumber: '',
  addressLine1: '',
  addressLine2: '',
  website: '',
  sector: '',
  yearsInBusiness: '',
  employees: '',
  contactName: '',
  jobTitle: '',
  email: '',
  phone: '',
  creditLimitRequested: '',
  paymentTerms: '',
  currency: 'GBP',
  monthlyOrderValue: '',
  products: '',
  signatoryName: '',
  signatoryTitle: '',
  signature: '',
  declarationDate: '',
  declarationAccepted: false,
};

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    transition: 'box-shadow 0.2s ease',
  },
  '& .MuiOutlinedInput-root.Mui-focused': {
    boxShadow: '0 0 0 4px rgba(231,57,15,0.12)',
  },
};

const sectionHeadingSx = {
  fontWeight: 700,
  fontSize: '1.1rem',
  mb: 0.5,
};

type FieldErrors = Partial<Record<keyof CreditFormData, string>>;

export default function CreditApplicationForm() {
  const [formData, setFormData] = React.useState<CreditFormData>(initialFormState);
  const [errors, setErrors] = React.useState<FieldErrors>({});

  const { mutate, isPending, isSuccess, isError, reset } = useSubmitCreditApplication();

  const handleChange = (field: keyof CreditFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, declarationAccepted: e.target.checked }));
    if (errors.declarationAccepted) {
      setErrors((prev) => ({ ...prev, declarationAccepted: undefined }));
    }
  };

  const validate = (): boolean => {
    const next: FieldErrors = {};
    const required: Array<[keyof CreditFormData, string]> = [
      ['registrationNumber', 'Registration number is required'],
      ['companyName', 'Company name is required'],
      ['addressLine1', 'Address is required'],
      ['sector', 'Sector is required'],
      ['yearsInBusiness', 'Years in business is required'],
      ['contactName', 'Contact name is required'],
      ['jobTitle', 'Job title is required'],
      ['paymentTerms', 'Payment terms are required'],
      ['signatoryName', 'Signatory name is required'],
      ['signatoryTitle', 'Signatory title is required'],
      ['signature', 'Signature is required'],
    ];
    for (const [field, msg] of required) {
      if (!String(formData[field]).trim()) next[field] = msg;
    }

    if (!formData.email.trim()) {
      next.email = 'Email is required';
    } else if (!EMAIL_RE.test(formData.email)) {
      next.email = 'Enter a valid email address';
    }

    if (!formData.phone.trim()) {
      next.phone = 'Phone is required';
    } else if (!PHONE_RE.test(formData.phone)) {
      next.phone = 'Enter a valid phone number';
    }

    if (formData.website.trim() && !/^https?:\/\/.+/.test(formData.website.trim())) {
      next.website = 'Website must start with http:// or https://';
    }

    const credit = Number(formData.creditLimitRequested);
    if (!formData.creditLimitRequested.trim()) {
      next.creditLimitRequested = 'Credit limit is required';
    } else if (!Number.isFinite(credit) || credit <= 0) {
      next.creditLimitRequested = 'Enter an amount greater than 0';
    } else if (credit > MAX_CREDIT_LIMIT) {
      next.creditLimitRequested = `Amount cannot exceed ${MAX_CREDIT_LIMIT.toLocaleString()}`;
    }

    const monthly = Number(formData.monthlyOrderValue);
    if (!formData.monthlyOrderValue.trim()) {
      next.monthlyOrderValue = 'Monthly order value is required';
    } else if (!Number.isFinite(monthly) || monthly < 0) {
      next.monthlyOrderValue = 'Enter a valid amount';
    }

    if (!formData.declarationDate) {
      next.declarationDate = 'Declaration date is required';
    } else if (new Date(formData.declarationDate) > new Date()) {
      next.declarationDate = 'Date cannot be in the future';
    }

    if (!formData.declarationAccepted) {
      next.declarationAccepted = 'You must accept the declaration';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const trimOrUndef = (v: string) => {
      const t = v.trim();
      return t === '' ? undefined : t;
    };

    const payload: CreditLineApplicationRequest = {
      registrationNumber: formData.registrationNumber.trim(),
      companyName: formData.companyName.trim(),
      vatNumber: trimOrUndef(formData.vatNumber),
      addressLine1: formData.addressLine1.trim(),
      addressLine2: trimOrUndef(formData.addressLine2),
      website: trimOrUndef(formData.website),
      sector: formData.sector.trim(),
      yearsInBusiness: formData.yearsInBusiness.trim(),
      employees: trimOrUndef(formData.employees),
      contactName: formData.contactName.trim(),
      jobTitle: formData.jobTitle.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      creditLimitRequested: Number(formData.creditLimitRequested),
      paymentTerms: formData.paymentTerms.trim(),
      currency: formData.currency,
      monthlyOrderValue: Number(formData.monthlyOrderValue),
      products: trimOrUndef(formData.products),
      signatoryName: formData.signatoryName.trim(),
      signatoryTitle: formData.signatoryTitle.trim(),
      signature: formData.signature.trim(),
      declarationDate: new Date(formData.declarationDate).toISOString(),
      declarationAccepted: formData.declarationAccepted,
    };

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
          Credit line application
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Complete the form below and our team will review your application and be in touch.
        </Typography>
      </Reveal>

      <Grow in={isSuccess} unmountOnExit>
        <Alert severity="success" sx={{ mb: 3 }} onClose={reset}>
          Thanks — your credit line application has been received. We&apos;ll be in touch soon.
        </Alert>
      </Grow>
      <Grow in={isError} unmountOnExit>
        <Alert severity="error" sx={{ mb: 3 }} onClose={reset}>
          Something went wrong submitting your application. Please check your details and try again.
        </Alert>
      </Grow>

      <Reveal delay={150}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            {/* 1. Company Details */}
            <Grid size={12}>
              <Typography component="h3" sx={sectionHeadingSx}>
                Company details
              </Typography>
              <Divider />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Company name" value={formData.companyName}
                onChange={handleChange('companyName')} error={!!errors.companyName}
                helperText={errors.companyName} disabled={isPending} sx={fieldSx} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Registration number" value={formData.registrationNumber}
                onChange={handleChange('registrationNumber')} error={!!errors.registrationNumber}
                helperText={errors.registrationNumber} disabled={isPending} sx={fieldSx} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="VAT number (optional)" value={formData.vatNumber}
                onChange={handleChange('vatNumber')} disabled={isPending} sx={fieldSx} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Website (optional)" value={formData.website}
                onChange={handleChange('website')} error={!!errors.website}
                helperText={errors.website} disabled={isPending} sx={fieldSx} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Address line 1" value={formData.addressLine1}
                onChange={handleChange('addressLine1')} error={!!errors.addressLine1}
                helperText={errors.addressLine1} disabled={isPending} sx={fieldSx} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Address line 2 (optional)" value={formData.addressLine2}
                onChange={handleChange('addressLine2')} disabled={isPending} sx={fieldSx} />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth label="Sector" value={formData.sector}
                onChange={handleChange('sector')} error={!!errors.sector}
                helperText={errors.sector} disabled={isPending} sx={fieldSx} />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth label="Years in business" value={formData.yearsInBusiness}
                onChange={handleChange('yearsInBusiness')} error={!!errors.yearsInBusiness}
                helperText={errors.yearsInBusiness} disabled={isPending} sx={fieldSx} />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth label="Employees (optional)" value={formData.employees}
                onChange={handleChange('employees')} disabled={isPending} sx={fieldSx} />
            </Grid>

            {/* 2. Primary Contact */}
            <Grid size={12}>
              <Typography component="h3" sx={{ ...sectionHeadingSx, mt: 2 }}>
                Primary contact
              </Typography>
              <Divider />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Contact name" value={formData.contactName}
                onChange={handleChange('contactName')} error={!!errors.contactName}
                helperText={errors.contactName} disabled={isPending} sx={fieldSx} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Job title" value={formData.jobTitle}
                onChange={handleChange('jobTitle')} error={!!errors.jobTitle}
                helperText={errors.jobTitle} disabled={isPending} sx={fieldSx} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Email" type="email" value={formData.email}
                onChange={handleChange('email')} error={!!errors.email}
                helperText={errors.email} disabled={isPending} sx={fieldSx} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Phone" value={formData.phone}
                onChange={handleChange('phone')} error={!!errors.phone}
                helperText={errors.phone} disabled={isPending} sx={fieldSx} />
            </Grid>

            {/* 3. Credit Request */}
            <Grid size={12}>
              <Typography component="h3" sx={{ ...sectionHeadingSx, mt: 2 }}>
                Credit request
              </Typography>
              <Divider />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth label="Credit limit requested" type="number"
                value={formData.creditLimitRequested} onChange={handleChange('creditLimitRequested')}
                error={!!errors.creditLimitRequested} helperText={errors.creditLimitRequested}
                disabled={isPending} sx={fieldSx} />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField select fullWidth label="Currency" value={formData.currency}
                onChange={handleChange('currency')} disabled={isPending} sx={fieldSx}>
                {CURRENCIES.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth label="Monthly order value" type="number"
                value={formData.monthlyOrderValue} onChange={handleChange('monthlyOrderValue')}
                error={!!errors.monthlyOrderValue} helperText={errors.monthlyOrderValue}
                disabled={isPending} sx={fieldSx} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Payment terms" value={formData.paymentTerms}
                onChange={handleChange('paymentTerms')} error={!!errors.paymentTerms}
                helperText={errors.paymentTerms} disabled={isPending} sx={fieldSx} />
            </Grid>
            <Grid size={12}>
              <TextField fullWidth label="Products of interest (optional)" value={formData.products}
                onChange={handleChange('products')} multiline minRows={2}
                disabled={isPending} sx={fieldSx} />
            </Grid>

            {/* 4. Declaration & Signature */}
            <Grid size={12}>
              <Typography component="h3" sx={{ ...sectionHeadingSx, mt: 2 }}>
                Declaration &amp; signature
              </Typography>
              <Divider />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Signatory name" value={formData.signatoryName}
                onChange={handleChange('signatoryName')} error={!!errors.signatoryName}
                helperText={errors.signatoryName} disabled={isPending} sx={fieldSx} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Signatory title" value={formData.signatoryTitle}
                onChange={handleChange('signatoryTitle')} error={!!errors.signatoryTitle}
                helperText={errors.signatoryTitle} disabled={isPending} sx={fieldSx} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Signature (type your full name)" value={formData.signature}
                onChange={handleChange('signature')} error={!!errors.signature}
                helperText={errors.signature} disabled={isPending} sx={fieldSx} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth label="Declaration date" type="date"
                value={formData.declarationDate} onChange={handleChange('declarationDate')}
                error={!!errors.declarationDate} helperText={errors.declarationDate}
                disabled={isPending} sx={fieldSx} slotProps={{ inputLabel: { shrink: true } }} />
            </Grid>
            <Grid size={12}>
              <FormControlLabel
                control={
                  <Checkbox checked={formData.declarationAccepted} onChange={handleCheckbox}
                    disabled={isPending} />
                }
                label="I confirm the information provided is accurate and I accept the credit terms."
              />
              {errors.declarationAccepted && (
                <Typography variant="caption" color="error" sx={{ display: 'block', ml: 4 }}>
                  {errors.declarationAccepted}
                </Typography>
              )}
            </Grid>

            <Grid size={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <MagneticWrap strength={0.15}>
                  <Button type="submit" variant="contained" color="primary" size="large"
                    fullWidth disabled={isPending}
                    sx={{
                      py: 1.5,
                      transition: 'background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                      '&:hover': { transform: 'translateY(-2px)' },
                    }}>
                    {isPending ? <CircularProgress size={24} color="inherit" /> : 'Submit Application'}
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
