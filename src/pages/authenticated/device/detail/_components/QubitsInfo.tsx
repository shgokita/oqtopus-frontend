import { Input } from '@/pages/_components/Input';
import { Spacer } from '@/pages/_components/Spacer';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export const QubitsInfo = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <div className="w-[300px]">
        <Input label="Search" placeholder={t('device.detail.qubits_info.search')} />
      </div>
      <Spacer className="h-6" />
      <div className={clsx('h-[270px]', 'pr-5', 'scroll-y')}>
        <table className={clsx('w-full')}>
          <thead className={clsx('first:[&_th]:!pl-8', '[&_th]:!my-2.5')}>
            <tr>
              <th>Qubit</th>
              <th>T1 (us)</th>
              <th>T2 (us)</th>
              <th>{t('device.detail.qubits_info.table.frequency')} (GHz)</th>
              <th>{t('device.detail.qubits_info.table.anharmonicity')} (GHz)</th>
              <th>{t('device.detail.qubits_info.table.error')}</th>
            </tr>
          </thead>
          <tbody className={clsx('first:[&_td]:!pl-8', '[&_td]:!my-2.5')}>
            <tr>
              <td>0</td>
              <td>340.99</td>
              <td>85.09</td>
              <td>4.722</td>
              <td>-0.31198</td>
              <td>2.170e-2</td>
            </tr>
            <tr>
              <td>1</td>
              <td>340.99</td>
              <td>85.09</td>
              <td>4.722</td>
              <td>-0.31198</td>
              <td>2.170e-2</td>
            </tr>
            <tr>
              <td>2</td>
              <td>340.99</td>
              <td>85.09</td>
              <td>4.722</td>
              <td>-0.31198</td>
              <td>2.170e-2</td>
            </tr>
            <tr>
              <td>3</td>
              <td>340.99</td>
              <td>85.09</td>
              <td>4.722</td>
              <td>-0.31198</td>
              <td>2.170e-2</td>
            </tr>
            <tr>
              <td>4</td>
              <td>340.99</td>
              <td>85.09</td>
              <td>4.722</td>
              <td>-0.31198</td>
              <td>2.170e-2</td>
            </tr>
            <tr>
              <td>5</td>
              <td>340.99</td>
              <td>85.09</td>
              <td>4.722</td>
              <td>-0.31198</td>
              <td>2.170e-2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
