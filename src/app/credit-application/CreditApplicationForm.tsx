'use client';

import * as React from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useSubmitCreditApplication } from '@/api/useSubmitCreditApplication';
import {
  CURRENCIES,
  DEFAULT_MAX_LENGTH,
  EMPTY_APPLICATION,
  FIELDS,
  SECTIONS,
  labelFor,
  validateApplication,
  type CreditApplication,
  type CreditErrors,
  type CreditField,
} from '@/lib/creditApplication';

// Same focus ring as the contact form. White only on the input box itself,
// so error messages sit on the page colour.
const fieldSx = {
  '& .MuiOutlinedInput-root': { bgcolor: '#fff', transition: 'box-shadow 0.2s ease' },
  '& .MuiOutlinedInput-root.Mui-focused': { boxShadow: '0 0 0 4px rgba(231,57,15,0.12)' },
};

const sectionTitleSx = {
  fontSize: '0.85rem',
  fontWeight: 800,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'text.primary',
  mb: 2,
} as const;

export default function CreditApplicationForm() {
  // useState<CreditApplication> tells TypeScript what shape the state has.
  const [form, setForm] = React.useState<CreditApplication>(EMPTY_APPLICATION);
  const [errors, setErrors] = React.useState<CreditErrors>({});
  const { mutate, isPending, isSuccess, isError, reset } = useSubmitCreditApplication();

  // A function that returns a function: handleChange('email') gives back the
  // onChange handler for the email field.
  const handleChange =
    (field: CreditField) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  // Number boxes accept "-", "+" and "e" (as in 1e5) by default. Block them,
  // and "." too where only whole numbers make sense.
  const blockInvalidKeys = (field: CreditField) => (e: React.KeyboardEvent) => {
    const blocked = FIELDS[field].integer ? ['-', '+', 'e', 'E', '.'] : ['-', '+', 'e', 'E'];
    if (blocked.includes(e.key)) e.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateApplication(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    mutate(form, { onSuccess: () => setForm(EMPTY_APPLICATION) });
  };

  if (isSuccess) {
    return (
      <Alert severity="success" sx={{ my: 4 }}>
        Thank you. Your credit application has been received and our team will be in touch.
      </Alert>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {SECTIONS.map((section) => (
        <Box key={section.title} component="section" sx={{ mb: 5 }}>
          <Typography component="h2" sx={sectionTitleSx}>
            {section.title}
          </Typography>

          {section.declaration && (
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'primary.main',
                bgcolor: 'rgba(231,57,15,0.04)',
                p: { xs: 2.5, md: 3 },
                mb: 3,
              }}
            >
              <Typography sx={{ fontWeight: 700, mb: 1 }}>{section.declaration.heading}</Typography>
              <Box component="ul" sx={{ m: 0, pl: 3, color: 'text.secondary', lineHeight: 1.8 }}>
                {section.declaration.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </Box>
            </Box>
          )}

          <Grid container spacing={2.5}>
            {section.fields.map((field) => {
              const config = FIELDS[field];
              const isCurrency = field === 'currency';
              return (
                <Grid key={field} size={{ xs: 12, md: config.fullWidth ? 12 : 6 }}>
                  <TextField
                    fullWidth
                    select={isCurrency}
                    label={labelFor(field, form.currency)}
                    required={config.required}
                    placeholder={config.placeholder}
                    type={config.type ?? 'text'}
                    value={form[field]}
                    onChange={handleChange(field)}
                    onKeyDown={config.type === 'number' ? blockInvalidKeys(field) : undefined}
                    error={Boolean(errors[field])}
                    helperText={errors[field]}
                    disabled={isPending}
                    multiline={field === 'primaryProducts'}
                    minRows={field === 'primaryProducts' ? 3 : undefined}
                    slotProps={{
                      // Date inputs always show "dd/mm/yyyy", so the label must sit above.
                      inputLabel: config.type === 'date' ? { shrink: true } : undefined,
                      htmlInput: {
                        maxLength: config.maxLength ?? DEFAULT_MAX_LENGTH,
                        // Stops the up/down arrows going below the minimum.
                        min: config.type === 'number' ? (config.min ?? 0) : undefined,
                        step: config.integer ? 1 : undefined,
                      },
                    }}
                    sx={fieldSx}
                  >
                    {isCurrency &&
                      CURRENCIES.map((currency) => (
                        <MenuItem key={currency} value={currency}>
                          {currency}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ))}

      {isError && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={reset}>
          Something went wrong sending your application. Please try again.
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isPending}
          endIcon={isPending ? undefined : <ChevronRightIcon />}
          sx={{ px: 6, py: 1.75, fontWeight: 700, letterSpacing: '0.06em', borderRadius: 0 }}
        >
          {isPending ? <CircularProgress size={24} color="inherit" /> : 'Submit Application'}
        </Button>
      </Box>
    </Box>
  );
}
