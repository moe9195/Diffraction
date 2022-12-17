import * as array from "./array.js";
import { fft2 } from "./fft.js";
import {
  matrix,
  sin,
  cos,
  subtract,
  add,
  dotPow,
  sqrt,
  dotDivide,
  complex,
  dotMultiply,
  exp,
  row,
  abs,
  re,
  im,
  max,
} from "mathjs";

export const expr = (x, y, nnn) => {
  const L = 0.1;
  const i = array.arange(nnn, 1);
  const c = 1;
  const omega = 100;

  const [X, _I] = array.meshgrid(x, i);
  const [Y, I] = array.meshgrid(y, i);

  const dX = dotPow(
    subtract(
      matrix(X),
      dotMultiply(cos(dotMultiply(matrix(I), 2 * Math.PI * (1 / nnn))), 2)
    ),
    2
  );
  const dY = dotPow(
    subtract(
      matrix(Y),
      dotMultiply(sin(dotMultiply(matrix(I), 2 * Math.PI * (1 / nnn))), 2)
    ),
    2
  );
  const D = sqrt(add(L * L, add(dX, dY)));
  const a = dotDivide(complex(0, 1), D);
  const gamma = exp(dotMultiply(complex(0, (-1 * omega) / c), D));

  return array.sumRows(dotMultiply(gamma, a).toArray());
};

export const generatePattern = (nnn, ii, mag) => {
  const d = 3 * (2 ** mag / 120) * ii;
  const l = 2 ** mag;
  const R = array.arange(l, 0);
  const [A1, A2] = array.meshgrid(R, R);

  const S = exp(dotMultiply(complex(0, 1), add(A1, A2)));

  const [f1, f2] = array.meshgrid(
    array.linspace(-d, d, l),
    array.linspace(-d, d, l)
  );

  let f = array.zeros(l, l);

  for (let i = 0; i < l; i++) {
    f[i] = expr(row(f1, i)[0], row(f2, i)[0], nnn);
  }

  let s = dotMultiply(dotMultiply(1 / (mag * ii * nnn), S), f);

  let [real, imag] = fft2(re(s), im(s));
  let X = abs(add(real, dotMultiply(complex(0, 1), imag)));

  let quadrant = dotMultiply(255 / max(X), X);

  let stackedx = array.stackX(quadrant, array.mirror(quadrant));
  let stackedy = array.stackY(stackedx, stackedx);
  let fullArr = array.stackY(stackedy, array.rotate(stackedy, 2));

  return fullArr;
};
