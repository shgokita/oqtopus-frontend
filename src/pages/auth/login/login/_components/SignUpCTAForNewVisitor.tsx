import clsx from 'clsx';
import i18next from 'i18next';
import { NavLink } from 'react-router';

const URI_SIGN_UP = '/signup';

export const SignUpCTAForVisitor = () => (
  <div className={clsx('text-xs')}>
    {i18next.language === 'ja' ? (
      <>
        アカウントを持っていない場合{' '}
        <NavLink to={URI_SIGN_UP} className="text-link">
          サインアップ
        </NavLink>
      </>
    ) : (
      <>
        If you don't have an account{' '}
        <NavLink to={URI_SIGN_UP} className="text-link">
          Sign up
        </NavLink>
      </>
    )}
  </div>
);
