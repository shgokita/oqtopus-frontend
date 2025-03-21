import clsx from 'clsx';
import { Header } from '../_components/Header';
import { Footer } from '../_components/Footer';
import { Hero } from './_components/Hero';
import { useTranslation } from 'react-i18next';
import { Spacer } from '../_components/Spacer';
import { Outlet } from 'react-router';

export default function AuthLayout() {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className={clsx('px-8', 'pt-8')}>
        <Hero />
        <Spacer className="h-8" />
        <div className={clsx('flex', 'flex-1')}>
          <div className={clsx('w-1/2', 'flex', 'justify-center')}>
            <Outlet />
          </div>
        </div>
      </div>
      <Footer isAbsolute={true} />
    </>
  );
}
