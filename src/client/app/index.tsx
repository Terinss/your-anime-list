import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

const rootNode = document.getElementById('root');
if (rootNode) {
  const root = createRoot(rootNode, {});

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
