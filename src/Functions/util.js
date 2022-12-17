export const brightnessFactor = (rgb) => {
  const r = rgb[0];
  const g = rgb[1];
  const b = rgb[2];
  const maxBrightness = Math.sqrt(r * r + g * g + b * b);
  const brightness = Math.sqrt(r * r * 0.509 + g * g * 1.0 + b * b * 0.194);
  return brightness / maxBrightness;
};
