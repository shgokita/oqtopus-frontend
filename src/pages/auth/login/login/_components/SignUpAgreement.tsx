import clsx from 'clsx';
import i18next from 'i18next';
import { NavLink } from 'react-router';

const URI = {
  termsOfService: '/',
  privacyPolicy: '/',
};

export const SignUpAgreement = () => (
  <p className={clsx('text-xs', 'leading-[1.8]')}>
    {i18next.language === 'ja' ? (
      <>
        <NavLink to={URI.termsOfService} className="text-link">
          利用規約
        </NavLink>
        及び
        <NavLink to={URI.privacyPolicy} className="text-link">
          プライバシーポリシー
        </NavLink>
        をご確認いただき、同意いただける場合は以下よりアカウント登録を完了させてください。
      </>
    ) : (
      <>
        Please check the{' '}
        <NavLink to={URI.termsOfService} className="text-link">
          Terms of Use
        </NavLink>{' '}
        and{' '}
        <NavLink to={URI.privacyPolicy} className="text-link">
          Privacy Policy
        </NavLink>
        , and if you agree, please complete the account registration below.
      </>
    )}
  </p>
);
