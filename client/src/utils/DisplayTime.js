export const dispSecondsAsMins = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const seconds_ = seconds % 60;
  return mins.toString() + ":" + (seconds_ == 0 ? "00" : seconds_.toString());
};
