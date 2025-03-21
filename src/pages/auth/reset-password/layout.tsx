import { Outlet } from 'react-router';
import { ResetPasswordProvider } from './_components/Provider';

export default function ResetPasswordLayout() {
  return (
    <ResetPasswordProvider>
      <Outlet />
    </ResetPasswordProvider>
  );
}
