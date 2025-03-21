import { Outlet, useNavigate } from 'react-router';
import { useAuth } from '@/auth/hook';

export default function LoginLayout() {
  const { initialized, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (initialized && isAuthenticated) {
    navigate('/dashboard');
  }
  return <Outlet />;
}
