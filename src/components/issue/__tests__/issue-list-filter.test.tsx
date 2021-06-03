import { MockedProvider } from '@apollo/react-testing';
import { render, findByTestId, findByText } from '@testing-library/react';
import { DefaultOptions } from '@apollo/client';
import { IssueListFilter, ISSUES_COUNT_QUERY } from '../issue-list-filter';
import { ISSUE_STATE } from '../../../utils';

const variables = {
  owner: 'freeCodeCamp',
  name: 'freeCodeCamp',
};
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
  },
};

const request = {
  query: ISSUES_COUNT_QUERY,
  variables,
};

const mocks = [
  {
    request,
    result: {
      data: {
        repository: {
          closedCount: { totalCount: 15168 },
          openedCount: { totalCount: 212 },
        },
      },
    },
  },
];

it('IssueListFilter shoud render IssueCommentList Tabs with text', async () => {
  const { container } = render(
    <MockedProvider
      mocks={mocks}
      defaultOptions={defaultOptions}
      addTypename={false}
    >
      <IssueListFilter {...variables} state={ISSUE_STATE.OPEN} />
    </MockedProvider>
  );

  const opennedTabSpan = await findByText(container, '212 OPEN');

  expect(opennedTabSpan).toBeTruthy();

  const closedTabSpan = await findByText(container, '15168 CLOSED');

  expect(closedTabSpan).toBeTruthy();
});

it('IssueListFilter shoud return null', async () => {
  const { container } = render(
    <MockedProvider
      mocks={[{ result: { data: {} }, request }]}
      defaultOptions={defaultOptions}
      addTypename={false}
    >
      <IssueListFilter {...variables} state={ISSUE_STATE.OPEN} />
    </MockedProvider>
  );

  expect(container.querySelector('div')).toBeNull();
});
