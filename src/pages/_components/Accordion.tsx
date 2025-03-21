import { FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export type Props = {
  isOpen: boolean;
} & React.PropsWithChildren;

export const Accordion: FC<Props> = (props) => {
  const [heightStyle, setHeightStyle] = useState(props.isOpen ? undefined : '0px');
  const [isOverflowHidden, setIsOverflowHidden] = useState<boolean>(!props.isOpen);
  const elAccordionRef = useRef<HTMLDivElement | null>(null);
  const elContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (elAccordionRef.current == null) {
      return;
    }
    // 処理の最初にoverflow: hiddenをセットするためにisOverflowをtrueにする
    setIsOverflowHidden(true);
    // 現在の高さを設定
    setHeightStyle(`${elAccordionRef.current.clientHeight}px`);

    // setTimeoutを使ってワンテンポ置いて目標の高さに設定する
    setTimeout(() => {
      setHeightStyle(() => {
        if (elContentRef.current == null) {
          return '0px';
        }
        return props.isOpen ? `${elContentRef.current.clientHeight}px` : '0px';
      });
    }, 100);
  }, [props.isOpen]);

  // CSS Transitionが終わった時の処理
  const handleTransitionEnd = (): void => {
    // 開いた時は高さとoverflowの設定を解除
    if (props.isOpen) {
      setHeightStyle('');
      setIsOverflowHidden(false);
    }
  };

  return (
    <div
      ref={elAccordionRef}
      style={{
        height: heightStyle,
        overflow: isOverflowHidden ? 'hidden' : '',
      }}
      onTransitionEnd={handleTransitionEnd}
      className={clsx(['transition-[height]', 'duration-500'])}
    >
      <div ref={elContentRef}>{props.children}</div>
    </div>
  );
};
