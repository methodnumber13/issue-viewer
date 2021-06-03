import { IssueCommentList, COMMENTS_QUERY } from '../issue-comment-list';
import { MockedProvider } from '@apollo/react-testing';
import { render, findByTestId, findByText } from '@testing-library/react';
import { DefaultOptions } from '@apollo/client';

const variables = {
  owner: 'freeCodeCamp',
  name: 'freeCodeCamp',
  number: 42030,
};
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
  },
};

const request = {
  query: COMMENTS_QUERY,
  variables,
};

const mocks = [
  {
    request,
    result: {
      data: {
        repository: {
          issue: {
            comments: {
              edges: [
                {
                  node: {
                    id: '1',
                    body: 'some text',
                    author: {
                      avatarUrl: 'url',
                      login: 'login',
                    },
                    createdAt: '2016-02-01',
                  },
                },
              ],
            },
          },
        },
      },
    },
  },
];

describe('<IssueCommentLis />', () => {
  it('shoud render IssueCommentList', async () => {
    const { container } = render(
      <MockedProvider
        mocks={mocks}
        defaultOptions={defaultOptions}
        addTypename={false}
      >
        <IssueCommentList {...variables} placeholderCount={1} />
      </MockedProvider>
    );

    const el = await findByTestId(container, '2016-02-01');

    expect(el).toBeTruthy();
  });

  it('shoud return IssueCommentList Error', async () => {
    const { container } = render(
      <MockedProvider
        mocks={[{ request: { query: COMMENTS_QUERY, variables: {} } }]}
        defaultOptions={defaultOptions}
        addTypename={false}
      >
        <IssueCommentList {...variables} placeholderCount={1} />
      </MockedProvider>
    );

    const el = await findByText(container, 'Error');

    expect(el).toBeTruthy();
  });
});
