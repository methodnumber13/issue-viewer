import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

const SearchPage = lazy(() => import('./search-page'));
const IssuePage = lazy(() => import('./issue-page'));
const RepoPage = lazy(() => import('./repo-page'));
const NotFoundPage = lazy(() => import('./not-found-page'));

export const Routes = () => (
  <Suspense fallback={null}>
    <Switch>
      <Route path="/" exact component={SearchPage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/:owner/:name/issues/:number" exact component={IssuePage} />
      <Route path="/:owner/:name" exact component={RepoPage} />
      <Route component={NotFoundPage} /> *
    </Switch>
  </Suspense>
);
