import React, { useMemo } from 'react';
import clsx from 'clsx';

interface countsProps {
  combinedCircuitKey: string;
  programs: string[];
  selectedKeyIndex: string;
  onChange: (value: string) => void;
}

const dividedCountsKeyPre = 'Circuit index';

export const JobDetailMultiManualPullDown: React.FC<countsProps> = ({
  combinedCircuitKey,
  programs,
  selectedKeyIndex,
  onChange,
}: countsProps) => {
  const options = useMemo(() => {
    try {
      return [
        { value: combinedCircuitKey, label: combinedCircuitKey },
        ...programs.map((k, index) => ({ value: index, label: `${dividedCountsKeyPre} ${index}` })),
      ];
    } catch (error) {
      console.error('Failed to generate options:', error);
      return [{ value: combinedCircuitKey, label: combinedCircuitKey }];
    }
  }, [combinedCircuitKey, programs]);

  return (
    <>
      {/* PullDown */}
      <div className="pull-down-wrapper">
        <select
          className={clsx('pull-down')}
          value={selectedKeyIndex}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
