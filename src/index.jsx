import { render } from 'solid-js/web';
import App from './App';
import './index.css';

// Sentry Error Logging
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: import.meta.env.VITE_PUBLIC_SENTRY_DSN,
  environment: import.meta.env.VITE_PUBLIC_APP_ENV,
  integrations: [Sentry.browserTracingIntegration()],
  initialScope: {
    tags: {
      type: 'frontend',
      projectId: import.meta.env.VITE_PUBLIC_APP_ID,
    },
  },
});

// إضافة دعم PWA للتطبيق (سيضيف هذا عامل خدمة وملف manifest، لا تحتاج إلى القيام بأي شيء آخر)
window.progressierAppRuntimeSettings = {
  uid: import.meta.env.VITE_PUBLIC_APP_ID,
  icon512: 'https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/d9859efc-5c69-44a6-bf7e-543676e82d29/bb3e8d31-3962-457e-a6c4-4fdaabb3e111.png?width=512&height=512',
  name: 'New App',
  shortName: 'New App',
};
let script = document.createElement('script');
script.setAttribute('src', 'https://progressier.app/z8yY3IKmfpDIw3mSncPh/script.js');
script.setAttribute('defer', 'true');
document.querySelector('head').appendChild(script);

render(() => <App />, document.getElementById('root'));