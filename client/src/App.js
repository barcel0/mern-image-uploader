import React from 'react';
import User from './Components/User';
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <Provider store={store}>
      <ToastContainer />
      <User />
    </Provider>
  );
}

export default App;
