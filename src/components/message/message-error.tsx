import ErrorIcon from '@material-ui/icons/ErrorOutlineOutlined';
import { Message, MessageProps } from './message';

export const MessageError = (props: Omit<MessageProps, 'className'>) => (
  <Message {...props} />
);

MessageError.defaultProps = {
  title: 'Something went wrong',
  description:
    'There was a problem loading data. Check your internet and try again.',
  icon: <ErrorIcon color="error" />,
};
