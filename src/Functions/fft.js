/* 
 * Construct an object for calculating the discrete Fourier transform (DFT) of size n, where n is a power of 2.
 */
export function FFT(n) {
  var i, k;
  this.n = n;
  this.levels = -1;
  for (i = 0; i < 32; i++) {
      if (1 << i === n) {
          this.levels = i;  // Equal to log2(n)
      }
  }
  if (this.levels === -1) {
      throw "Length is not a power of 2";
  }
  this.cosTable = new Array(n / 2);
  this.sinTable = new Array(n / 2);
  for (i = 0; i < n / 2; i++) {
      this.cosTable[i] = Math.cos(2 * Math.PI * i / n);
      this.sinTable[i] = Math.sin(2 * Math.PI * i / n);
  }
  /* 
    * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
    * The vector's length must be equal to the size n that was passed to the object constructor, and this must be a power of 2. Uses the Cooley-Tukey decimation-in-time radix-2 algorithm.
    */
  this.forward = function(real, imag) {
      var n = this.n;
      
      // Bit-reversed addressing permutation
      for (var i = 0; i < n; i++) {
          var j = reverseBits(i, this.levels);
          if (j > i) {
              var temp = real[i];
              real[i] = real[j];
              real[j] = temp;
              temp = imag[i];
              imag[i] = imag[j];
              imag[j] = temp;
          }
      }
  
      // Cooley-Tukey decimation-in-time radix-2 FFT
      for (var size = 2; size <= n; size *= 2) {
          var halfsize = size / 2;
          var tablestep = n / size;
          for (i = 0; i < n; i += size) {
              for (j = i, k = 0; j < i + halfsize; j++, k += tablestep) {
                  var tpre =  real[j+halfsize] * this.cosTable[k] +
                              imag[j+halfsize] * this.sinTable[k];
                  var tpim = -real[j+halfsize] * this.sinTable[k] +
                              imag[j+halfsize] * this.cosTable[k];
                  real[j + halfsize] = real[j] - tpre;
                  imag[j + halfsize] = imag[j] - tpim;
                  real[j] += tpre;
                  imag[j] += tpim;
              }
          }
      }
  
      // Returns the integer whose value is the reverse of the lowest 'bits' bits of the integer 'x'.
      function reverseBits(x, bits) {
          var y = 0;
          for (var i = 0; i < bits; i++) {
              y = (y << 1) | (x & 1);
              x >>>= 1;
          }
          return y;
      }
  }
}

export function fft2(real, imag) {
  const n = real.length;
  let realRowsTransformed = new Array(n);
  let imagRowsTransformed = new Array(n);
  let realColsTransformed = new Array(n);
  let imagColsTransformed = new Array(n);
  let fft, realRow, imagRow, realCol, imagCol;

  // FFT over rows
  var i;
  for (i = 0; i < n; i++) {
    fft = new FFT(n);
    realRow = [...real[i]];
    imagRow = [...imag[i]];
    fft.forward(realRow, imagRow);
    realRowsTransformed[i] = realRow;
    imagRowsTransformed[i] = imagRow;
  }

  // FFT over columns
  for (i = 0; i < n; i++) {
    fft = new FFT(n);
    realCol = [...col(realRowsTransformed, i)];
    imagCol = [...col(imagRowsTransformed, i)];
    fft.forward(realCol, imagCol);
    realColsTransformed[i] = realCol;
    imagColsTransformed[i] = imagCol;
  }

  return [transpose(realColsTransformed), transpose(imagColsTransformed)];
}

// Returns column at index n
const col = (arr, n) => arr.map(x => x[n]);

// Returns the transpose of the 2D array
const transpose = (arr) => arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));