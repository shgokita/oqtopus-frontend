import clsx from 'clsx';
import i18next from 'i18next';
import { NavLink } from 'react-router';

const URI = '/mfa-reset';

export const ResetMFADeviceCTA = () => (
  <div className={clsx('text-xs')}>
    {i18next.language === 'ja' ? (
      <>
        MFAデバイスをリセットしたい場合
        <br />
        <NavLink to={URI} className="text-link">
          MFAリセット
        </NavLink>
      </>
    ) : (
      <>
        If you want to reset the MFA device
        <br />
        <NavLink to={URI} className="text-link">
          MFA reset.
        </NavLink>
      </>
    )}
  </div>
);
