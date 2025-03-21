import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { JSONCodeBlock } from '@/pages/_components/JSONCodeBlock';
import { Spacer } from '@/pages/_components/Spacer';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export interface JobDetailMitigationInfoProps {
  mitigationInfo?: { [key: string]: any };
  maxHeight: number;
}

export const JobDetailMitigationInfo: React.FC<JobDetailMitigationInfoProps> = (
  job: JobDetailMitigationInfoProps
) => {
  const { t } = useTranslation();
  return (
    <>
      <h3 className={clsx('text-primary', 'font-bold')}>Error Mitigation Information</h3>
      <Spacer className="h-2" />
      {job.mitigationInfo === undefined || job.mitigationInfo === null ? (
        <div className={clsx('text-xs')}>{t('job.detail.mitigation_info.nodata')}</div>
      ) : (
        <SimpleBar style={{ maxHeight: job.maxHeight }}>
          <JSONCodeBlock json={JSON.stringify(job.mitigationInfo, null, 2)} />
        </SimpleBar>
      )}
    </>
  );
};
