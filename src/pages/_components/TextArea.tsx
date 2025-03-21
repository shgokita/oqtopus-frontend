import clsx from 'clsx';
import { ComponentPropsWithRef, forwardRef } from 'react';

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  {
    label?: string;
    errorMessage?: string;
  } & ComponentPropsWithRef<'textarea'>
>(({ label, errorMessage, className, ...props }, ref) => {
  return (
    <div className={clsx('grid', 'gap-1')}>
      {label && <p className="text-xs">{label}</p>}
      <textarea
        ref={ref}
        {...props}
        className={clsx(
          'w-full',
          ['rounded', 'border', 'outline-primary'],
          ['py-1.5', 'px-3', 'text-xs'],
          errorMessage && ['!border-error', '!outline-error'],
          className
        )}
      />
      {errorMessage && (
        <p className={clsx('text-xs', 'text-error', 'font-semibold')}>{errorMessage}</p>
      )}
    </div>
  );
});
