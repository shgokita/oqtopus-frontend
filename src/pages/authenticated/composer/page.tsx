import { Spacer } from '@/pages/_components/Spacer';
import { useDocumentTitle } from '@/pages/_hooks/title';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import QuantumCircuitComposer from './_components/QuantumCircuitComposer';

export default function Page() {
  const { t } = useTranslation();
  useDocumentTitle(t('composer.title'));

  return (
    <>
      <h2 className={clsx('text-primary', 'text-2xl', 'font-bold')}>{t('composer.title')}</h2>
      <Spacer className="h-3" />
      <p className={clsx('text-sm')}>{t('composer.description')}</p>
      <QuantumCircuitComposer/>
    </>
  );
}
