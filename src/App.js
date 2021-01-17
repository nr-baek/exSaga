import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';

import { Route, Switch } from 'react-router-dom';
import Error from './pages/Error';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import store from './redux/store';
import { check, tempSetUser } from './redux/modules/user';

function loadUser() {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    store.dispatch(tempSetUser(token));
    store.dispatch(check(token));
  } catch (e) {
    console.log('localStorage is not working');
  }
}
loadUser();

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Provider store={store}>
        <Switch>
          <Route component={LoginPage} path="/login" />
          <Route component={RegisterPage} path="/register" />
          <Route component={HomePage} path={['/']} exact />
          <Route component={NotFoundPage} />
        </Switch>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
