import clsx from 'clsx';

export const Divider = ({ className }: { className?: string }): React.ReactElement => (
  <div className={clsx('h-1', 'border-t', 'border-divider-bg', className)} />
);
