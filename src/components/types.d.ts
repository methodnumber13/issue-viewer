import { ReactNode } from 'react';
import { ISSUE_STATE } from '../utils';

export interface LayoutBaseProps {
  className?: string;
  children?: ReactNode;
}

export interface AuthorProps {
  login: string;
  avatarUrl: string;
}

export interface IssueStateProps {
  id: string;
  number: number;
  title: string;
  author: AuthorProps;
  comments: { totalCount: number };
  body: string;
  createdAt: string;
  state: ISSUE_STATE.OPEN | ISSUE_STATE.CLOSED;
  url: string;
}

export interface IssueNode {
  node: IssueStateProps;
}

export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
}

export type IssueFewType = 'issue' | 'issues';

export interface CommentsProps {
  edges: IssueNode[];
  pageInfo: PageInfo;
}

export interface IssueCommentsProps {
  comments: CommentsProps;
}

export interface IssueDTO {
  repository: {
    issue: IssueCommentsProps;
  };
}

export interface TabsPropsExtended extends Omit<TabsProps, 'onChange'> {
  onChange?: (e?: ChangeEvent, value?: string) => void;
}
