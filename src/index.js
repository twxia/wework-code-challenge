import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from '@/components/App';
import ThemeProvider from '@/components/ThemeProvider';
import { configureStore } from './store';

const store = configureStore({});

render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
