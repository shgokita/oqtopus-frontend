import clsx from 'clsx';
import { BsCheckCircle, BsExclamationCircleFill, BsInfoCircle } from 'react-icons/bs';

const ICON_SIZE = 20;

export const Alert = ({
  message,
  variation,
}: {
  message: string;
  variation: 'info' | 'error' | 'success';
}) => {
  return (
    <div
      className={clsx(
        ['rounded'],
        ['flex', 'gap-3', 'items-center', 'p-5'],
        'font-bold',
        variation === 'info' && ['bg-info', 'text-info-base-content', 'bg-opacity-20'],
        variation === 'error' && ['bg-error', 'text-error-base-content', 'bg-opacity-20'],
        variation === 'success' && ['bg-success', 'text-success-base-content', 'bg-opacity-20']
      )}
    >
      {variation === 'info' && <BsInfoCircle size={ICON_SIZE} />}
      {variation === 'error' && <BsExclamationCircleFill size={ICON_SIZE} />}
      {variation === 'success' && <BsCheckCircle size={ICON_SIZE} />}
      {message}
    </div>
  );
};
