import clsx from 'clsx';

export const Badge = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      className={clsx(
        ['h-min', 'bg-gray-bg', 'rounded-full'],
        ['p-1', 'px-2'],
        ['font-semibold', 'text-xs', 'whitespace-nowrap']
      )}
    >
      {children}
    </div>
  );
};
