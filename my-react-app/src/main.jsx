import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot} from 'react-dom/client' ;
import { Provider } from 'react-redux';
import Signin from './pages/Signin';
import User from './pages/User';
import store from './store';
import App from './App';
import { fetchUserData } from './store/userDataSlice';
import Modal from 'react-modal';

const userData = JSON.parse(localStorage.getItem('userData'));
Modal.setAppElement('#root'); // Définir l'élément racine de votre application

// Dispatch l'action pour mettre à jour le store avec les données utilisateur
if (userData) {
  store.dispatch(fetchUserData.fulfilled(userData));
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/user" element={<User/>} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);




