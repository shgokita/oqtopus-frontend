import { Button } from '@/pages/_components/Button';
import { Spacer } from '@/pages/_components/Spacer';
import clsx from 'clsx';
import { t } from 'i18next';

export const Composer = (): React.ReactElement => (
  <>
    <div className={clsx('flex', 'justify-between', 'items-center')}>
      <div className={clsx('text-lg', 'font-bold', 'text-primary')}>
        {t('dashboard.composer.title')}
      </div>
      <Button
        // kind="link"
        color="secondary"
      >
        {t('dashboard.composer.button')}
      </Button>
    </div>
    <Spacer className="h-3" />
    <p className="text-xs">{t('dashboard.composer.description')}</p>
    <Spacer className="h-3" />
    <div className={clsx('flex', 'justify-center', 'py-4')}>
      {/* <image
        // src="./img/dashboard/composer_img.svg"
        alt="コンポーザーの図"
        width={213}
        height={86}
      /> */}
    </div>
  </>
);
