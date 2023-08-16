export function randomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getNumberFromBoolean(bol: boolean) {
  if (bol) {
    return 1;
  } else {
    return 0;
  }
}
