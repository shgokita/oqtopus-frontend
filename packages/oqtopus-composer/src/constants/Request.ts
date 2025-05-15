import { createAPIClient } from '../api/client';

const client = createAPIClient();

export const RequestPath = {
  cancelJob: client.jobs._jobId(':id').cancel.$path(),
  getJob: client.jobs._jobId(':id').$path(),
  postJob: client.jobs.$path(),
};
