import moment from 'moment';

export const TimeAgo = ({ date }: { date: string | undefined }) => (
  <span>{moment(date).fromNow()}</span>
);
