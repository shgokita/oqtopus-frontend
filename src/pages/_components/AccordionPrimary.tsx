import { Accordion } from './Accordion';
import { useState } from 'react';
import clsx from 'clsx';

export const AccordionPrimary = ({
  headerContent,
  children,
}: {
  headerContent: React.ReactElement;
} & React.PropsWithChildren): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className={clsx(
          'accordion-header-primary',
          ['rounded', 'flex', 'content-center', 'p-3.5', 'font-bold', 'cursor-pointer'],
          isOpen && 'is-active'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {headerContent}
      </div>
      <Accordion isOpen={isOpen}>{children}</Accordion>
    </div>
  );
};
