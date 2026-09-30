'use client';

import CookieConsent from 'react-cookie-consent';
import appInsights from '@/lib/appInsights';
import { BANNER_DARK } from "@/theme/brand";

export default function CookieBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="mars-cookie-consent"
      expires={365}
      style={{
        background: BANNER_DARK,
        borderTop: '1px solid rgba(255,255,255,0.1)',
        alignItems: 'center',
        fontSize: '0.85rem',
      }}
      contentStyle={{ margin: '8px 0' }}
      buttonStyle={{
        background: '#E7390F',
        color: '#fff',
        fontWeight: 700,
        borderRadius: '4px',
        fontSize: '0.8rem',
        padding: '8px 20px',
        margin: '8px',
      }}
      declineButtonStyle={{
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.4)',
        color: '#fff',
        borderRadius: '4px',
        fontSize: '0.8rem',
        padding: '8px 20px',
        margin: '8px',
      }}
      onAccept={() => {
        appInsights.config.isCookieUseDisabled = false;
        appInsights.trackEvent({ name: 'CookiesAccepted' });
      }}
      onDecline={() => {
        appInsights.config.isCookieUseDisabled = true;
        appInsights.trackEvent({ name: 'CookiesDeclined' });
      }}
    >
      We use cookies to analyse site usage and improve your experience.{' '}
      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
        This helps us understand how visitors use our site.
      </span>
    </CookieConsent>
  );
}