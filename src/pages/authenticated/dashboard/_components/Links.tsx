import clsx from 'clsx';
import i18next from 'i18next';

export const Links = (): React.ReactElement => (
  // TODO: Enable links
  // <ul className={clsx('text-primary', 'text-sm')} >
  <ul className={clsx(['flex', 'flex-col', 'gap-3'], ['text-primary', 'text-sm'])} hidden>
    <li className={clsx('pl-[1em]', 'indent-[-1em]')}>
      ・
      <a href="#" target="_blank" className="text-link">
        {i18next.language === 'ja' ? 'ここにリンク集のタイトルが入ります' : 'text text text text'}
      </a>
    </li>
    <li className={clsx('pl-[1em]', 'indent-[-1em]')}>
      ・
      <a href="#" target="_blank" className="text-link">
        ここにリンク集のタイトルが入りますここにリンク集のタイトルが入りますここにリンク集のタイトルが入りますここにリンク集のタイトルが入りますここにリンク集のタイトルが入りますここにリンク集のタイトルが入りますここにリンク集のタイトルが入ります
      </a>
    </li>
    <li className={clsx('pl-[1em]', 'indent-[-1em]')}>
      ・
      <a href="#" target="_blank" className="text-link">
        ここにリンク集のタイトルが入りますここにリンク集のタイトルが入りますここにリンク集のタイトルが入ります
      </a>
    </li>
  </ul>
);
