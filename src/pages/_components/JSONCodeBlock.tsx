import clsx from 'clsx';
import JsonFormatter from 'react-json-formatter';

export const JSONCodeBlock = ({ json }: { json: string }) => {
  return (
    <div className={clsx('p-3', 'rounded', 'text-sm', 'bg-cmd-bg')}>
      {json === '' ? (
        <>{'{}'}</>
      ) : (
        <JsonFormatter
          tabWith={4}
          json={json}
          jsonStyle={{
            propertyStyle: { color: 'slategray' },
            stringStyle: { color: 'green' },
            numberStyle: { color: 'orangered' },
            booleanStyle: { color: 'orangered' },
            nullStyle: { color: 'red' },
          }}
        />
      )}
    </div>
  );
};
