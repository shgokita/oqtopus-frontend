import clsx from 'clsx';

export const Footer = ({ isAbsolute }: { isAbsolute: boolean }): React.ReactElement => {
  return (
    <footer
      className={clsx(
        ['w-full', 'py-4', 'px-[30px]'],
        isAbsolute && ['absolute', 'bottom-0', 'left-0']
      )}
    >
      <div className={clsx('text-primary', 'text-right', 'text-2xs')}>
        &copy; OQTOPUS Team. All rights reserved.
      </div>
    </footer>
  );
};
