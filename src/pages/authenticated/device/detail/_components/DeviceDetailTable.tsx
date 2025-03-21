import { Device } from '@/domain/types/Device';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export const DeviceDetailTable = ({ device }: { device: Device }): React.ReactElement => {
  const { t } = useTranslation();

  // TODO: implement device detail table
  return (
    <table className={clsx('w-full')}>
      <thead>
        <tr>
          <th>{t('device.detail.table.1q_fidelity')} (%)</th>
          <th>T1 (us)</th>
          <th>{t('device.detail.table.2q_fidelity')} (%)</th>
          <th>T2 (us)</th>
          <th>{t('device.detail.table.average_fidelity')} (%)</th>
          <th>{t('device.detail.table.time')} (us)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>99.840</td>
          <td>100000.000</td>
          <td>95.360</td>
          <td>200000.000</td>
          <td>99.752</td>
          <td>130.000</td>
        </tr>
      </tbody>
    </table>
  );
};
