import { MockedProvider } from '@apollo/react-testing';
import { render, findByText } from '@testing-library/react';
import { DefaultOptions } from '@apollo/client';
import { IssuesLoader, ISSUES_QUERY } from '../issue-loader';
import { ISSUE_STATE } from '../../../utils';
import { IssueStateProps } from '../../types';

const variables = {
  owner: 'freeCodeCamp',
  name: 'freeCodeCamp',
  state: ISSUE_STATE.OPEN,
  pageSize: 10,
};
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
  },
};

const request = {
  query: ISSUES_QUERY,
  variables,
};

const mocks = [
  {
    request,
    result: {
      data: {
        repository: {
          issues: {
            edges: [{ node: { id: '1', number: 2323 } as IssueStateProps }],
          },
        },
      },
    },
  },
];
describe('<IssuesLoader />', () => {
  it('IssuesLoader shoud return Error', async () => {
    const { container } = render(
      <MockedProvider
        mocks={mocks}
        defaultOptions={defaultOptions}
        addTypename={false}
      >
        <IssuesLoader {...variables}>
          {({ issues }) => {
            return (
              <div>
                {issues.edges.map(({ node }) => (
                  <div>{node.number}</div>
                ))}
              </div>
            );
          }}
        </IssuesLoader>
      </MockedProvider>
    );

    expect(await findByText(container, 'Something went wrong')).toBeTruthy();
  });

  it('IssuesLoader shoud return null', async () => {
    const { container } = render(
      <MockedProvider
        mocks={mocks}
        defaultOptions={defaultOptions}
        addTypename={false}
      >
        <IssuesLoader children={null} {...variables}></IssuesLoader>
      </MockedProvider>
    );

    expect(container.querySelector('div')).toBeNull();
  });
});
