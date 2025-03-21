import './globals.css';

import { I18nProvider } from '@/i18n/Provider';
import { AuthProvider } from '@/auth/Provider';
import { Outlet } from 'react-router';

export default function RootLayout() {
  return (
    <I18nProvider>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </I18nProvider>
  );
}
