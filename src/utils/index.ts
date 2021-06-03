export enum ISSUE_STATE {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export const formatStarCount = (value: number | undefined) => {
  if (!value) return null;
  return value > 999 ? Number((value / 1000).toFixed(1)) + 'k' : value;
};
