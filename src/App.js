import './App.css';
import Nav from './Nav';
import Register from './Pages/Register';
import {
  RegisterProvider,
  RegisterClient,
  Login,
  RecoverPassword,
  UserForgotPassword
} from './Pages/Parts';
import Home from './Pages/Home';
import { QueryClientProvider } from "react-query";
import { ReactQueryClient } from './config/apiConfig'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProfileProvider } from './hooks/profile'
import React from 'react';

function App() {
  return (
      <QueryClientProvider client={ReactQueryClient}>
        <ProfileProvider >
          <Router>

            {/*guest nav*/}
            <Nav />

            {/*Client logged component */}

            {/*Provider logged component */}

            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/register/client' element={<RegisterClient />} />
              <Route path='/register/provider' element={<RegisterProvider />} />
              <Route path='/recover-password' element={<RecoverPassword />} />
              <Route path='/forgot-password' element={<UserForgotPassword />} />

              <Route path='/' element={<Home />} />
            </Routes>
          </Router>
        </ProfileProvider>
      </QueryClientProvider>
  );
}

export default App;
