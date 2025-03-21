import { Button } from '@/pages/_components/Button';
import { Spacer } from '@/pages/_components/Spacer';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export const News = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <div className={clsx('flex', 'justify-between', 'items-center')}>
        <div className={clsx('text-base', 'font-bold', 'text-primary')}>
          {t('dashboard.news.title')}
        </div>
        <Button kind="link" color="secondary" href="/news">
          {t('dashboard.news.button')}
        </Button>
      </div>
      <Spacer className="h-4" />
      <div className={clsx('grid', 'gap-[23px]')}>
        <div className="text-xs">
          <p>製品アップデート</p>
          <Spacer className="h-2.5" />
          <p className="line-clamp-2 pl-3 leading-[1.8]">
            アクセススピード改善のためにプリミティブを最適化しましたアクセススピード改善のためにプリミティブを最適化しました
          </p>
          <Spacer className="h-2" />
          <p className="text-neutral-content pl-3">2023-01-23</p>
        </div>
        <div className="text-xs">
          <p>製品アップデート</p>
          <Spacer className="h-2.5" />
          <p className="line-clamp-2 pl-3 leading-[1.8]">
            アクセススピード改善のためにプリミティブを最適化しました
          </p>
          <Spacer className="h-2" />
          <p className="text-neutral-content pl-3">2023-01-23</p>
        </div>
        <div className="text-xs">
          <p>製品アップデート</p>
          <Spacer className="h-2.5" />
          <p className="line-clamp-2 pl-3 leading-[1.8]">
            アクセススピード改善のためにプリミティブを最適化しました
          </p>
          <Spacer className="h-2" />
          <p className="text-neutral-content pl-3">2023-01-23</p>
        </div>
      </div>
    </>
  );
};
