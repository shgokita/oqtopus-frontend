import clsx from 'clsx';

export const Card = ({ children, className }: React.PropsWithChildren & { className?: string }) => {
  return (
    <div className={clsx(['rounded-lg', 'shadow-lg'], ['p-5', 'bg-base-card'], className)}>
      {children}
    </div>
  );
};
