import { Complex } from './Complex';

/**
 * ベクトル配列の内積を返す
 *
 * leftベクトルは複素共役を取る
 * 縦横を区別しない
 * それぞれ引数のlengthは暗黙に等しいとみなす
 */
export function productVector2(left: Complex[], right: Complex[]): Complex {
  let result: Complex = { re: 0, im: 0 };
  left.forEach((c, index) => {
    result = sum(
      complexMulti({ re: c.re, im: c.im * -1 }, right[index]),
      result
    ); // NTOE: ユースケースで虚数部は利用されないので端折っても良い
  });
  return result;
}

/**
 * 複素数の積
 */
function complexMulti(l: Complex, r: Complex): Complex {
  return {
    re: l.re * r.re - l.im * r.im,
    im: l.re * r.im + l.im * r.re,
  };
}

/**
 * 複素数の和
 */
function sum(l: Complex, r: Complex): Complex {
  return {
    re: l.re + r.re,
    im: l.im + r.im,
  };
}
