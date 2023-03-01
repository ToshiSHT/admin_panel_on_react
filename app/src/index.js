import React from 'react';
import ReactDOM from 'react-dom/client';
import Editor from './components/editor/Editor';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Editor />
    </Provider>
);
