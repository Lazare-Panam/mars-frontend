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
} from '@mui/material';
import { useSubmitEnquiry } from '@/api/useSubmitEnquiry';

interface EnquiryFormData {
  userName: string;
  userEmail: string;
  userCompany: string;
  userCountry: string;
  message: string;
}

const initialFormState: EnquiryFormData = {
  userName: '',
  userEmail: '',
  userCompany: '',
  userCountry: '',
  message: '',
};

export default function ContactForm() {
  const [formData, setFormData] = React.useState<EnquiryFormData>(initialFormState);
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

    mutate(formData, {
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
      <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
        Get in touch
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Send us your technical enquiry and our team will get back to you shortly.
      </Typography>

      {isSuccess && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={reset}>
          Thanks — your enquiry has been received. We'll be in touch soon.
        </Alert>
      )}
      {isError && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={reset}>
          Something went wrong submitting your enquiry. Please try again.
        </Alert>
      )}

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
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Country"
              value={formData.userCountry}
              onChange={handleChange('userCountry')}
              disabled={isPending}
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
            />
          </Grid>
          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={isPending}
              sx={{ py: 1.5 }}
            >
              {isPending ? <CircularProgress size={24} color="inherit" /> : 'Submit Enquiry'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}