import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { fetchUsers } from './app/appSlices/usersSlice';
import { fetchPosts } from './app/appSlices/postsSlice';


store.dispatch(fetchUsers()); //update users in our store
// store.dispatch(fetchPosts()); //update users in our store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
);


