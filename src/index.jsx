import { render } from 'solid-js/web';
import App from './App';
import './index.css';

// Sentry Error Logging
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: import.meta.env.VITE_PUBLIC_SENTRY_DSN,
  environment: import.meta.env.VITE_PUBLIC_APP_ENV,
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
  icon512: 'https://your-icon-url.com/icon.png',
  name: 'أدوات تسهيل الوصول للمكفوفين',
  shortName: 'أدوات تسهيل الوصول',
};
let script = document.createElement('script');
script.setAttribute('src', 'https://progressier.app/your-app-id/script.js');
script.setAttribute('defer', 'true');
document.querySelector('head').appendChild(script);

render(() => <App />, document.getElementById('root'));