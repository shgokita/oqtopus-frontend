import { JobStatusType } from '@/domain/types/Job';
import clsx from 'clsx';

const JobStatusColor = {
  submitted: 'text-status-job-submitted',
  ready: 'text-status-job-ready',
  running: 'text-status-job-running',
  succeeded: 'text-status-job-succeeded',
  failed: 'text-status-job-failed',
  cancelled: 'text-status-job-cancelled',
  unknown: 'text-status-job-unknown',
};

export const JobStatus = ({ status }: { status: JobStatusType }): React.ReactElement => {
  return (
    <div className={clsx('flex', 'gap-1')}>
      <span className={JobStatusColor[status]}>●</span>
      {status}
    </div>
  );
};
