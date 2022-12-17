import { add } from "mathjs";

export const arange = (n, shift) =>
  Array.from({ length: n }, (_x, i) => i + shift);

export const transpone = (a) =>
  a[0].map((_, colIndex) => a.map((row) => row[colIndex]));

export const meshgrid = (a, b) => {
  let x = Array(b.length).fill(a);
  let y = Array(a.length).fill(b);

  return [x, transpone(y)];
};

export const depth = (a) => {
  if (Array.isArray(a)) return 1 + Math.max(...a.map((t) => depth(t)));
  else return 0;
};

export const linspace = (a, b, n) => {
  if (typeof n === "undefined") n = Math.max(Math.round(b - a) + 1, 1);
  if (n < 2) {
    return n === 1 ? [a] : [];
  }
  let i,
    ret = Array(n);
  n--;
  for (i = n; i >= 0; i--) {
    ret[i] = (i * b + (n - i) * a) / n;
  }
  return ret;
};

export const zeros = (rows, cols) =>
  Array(rows)
    .fill()
    .map(() => Array(cols).fill(0));

export const sumRows = (a) => {
  let res = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[i].length; j++) {
      res[j] = add(res[j] || 0, a[i][j]);
    }
  }
  return res;
};

export const rotate = (a, axis = 1) => {
  let rotated = a;
  for (let i = 0; i < axis; i++) {
    rotated = rotate90(rotated);
  }
  return rotated;
};

const rotate90 = (a) => {
  const M = a.length;
  const N = a[0].length;
  let rotated = zeros(N, M);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      rotated[i][j] = a[M - j - 1][i];
    }
  }

  return rotated;
};

export const mirror = (a) => [...a].map((r) => [...r].reverse());

export const stackX = (a, b) => {
  const M = a.length;
  const N = a[0].length;

  let stacked = zeros(N, 2 * M);
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      stacked[i][j] = a[i][j];
      stacked[i][j + M] = b[i][j];
    }
  }

  return stacked;
};

export const stackY = (a, b) => {
  const M = a[0].length;
  const N = a.length;

  let stacked = zeros(2 * N, M);
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      stacked[i][j] = a[i][j];
      stacked[i + N][j] = b[i][j];
    }
  }

  return stacked;
};

// export const scale = (m) => {
//   const transformationMatrix = [
//     []
//   ]
// }
