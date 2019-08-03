
import React from 'react';
import {
  render,
} from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history';
import reducer from '@/reducers';

function renderWithReduxAndRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    store = createStore(reducer),
  } = {}
) {
  return {
    ...render(<Provider store={store}>
      <Router history={history}>{ui}</Router>
    </Provider>),
    history,
  }
}

export default renderWithReduxAndRouter;
