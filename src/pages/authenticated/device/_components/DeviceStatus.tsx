import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import * as OAS from '@/api/generated';

const Available = OAS.DevicesDeviceInfoStatusEnum.Available;
const NotAvailable = OAS.DevicesDeviceInfoStatusEnum.Unavailable;

const DeviceStatusColor = {
  [Available]: 'text-status-device-green',
  [NotAvailable]: 'text-status-device-red',
};

export const DeviceStatus = ({
  status,
}: {
  status: OAS.DevicesDeviceInfoStatusEnum;
}): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <div className={clsx('flex', 'gap-1')}>
      <span className={DeviceStatusColor[status]}>●</span>
      {status === 'available' ? t('device.status.available') : t('device.status.unavailable')}
    </div>
  );
};
