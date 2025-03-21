import { JobsJobStatus } from '@/api/generated';

export const isFinishedStatus: (status: string) => boolean = (status: string) => {
  return [
    JobsJobStatus.Succeeded.toString(),
    JobsJobStatus.Failed.toString(),
    JobsJobStatus.Cancelled.toString(),
  ].includes(status);
};
