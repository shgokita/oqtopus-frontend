import clsx from 'clsx';

export const FormTitle = ({ children }: React.PropsWithChildren): React.ReactElement => (
  <div className={clsx('text-lg', 'font-bold', 'text-primary')}>{children}</div>
);
