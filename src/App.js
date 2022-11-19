import './App.css';
import Nav from './Nav';
import Register from './Pages/Register';
import { RegisterProvider } from './Pages/Parts';
import Home from './Pages/Home';
import RegisterClient from './Pages/Parts/RegisterClient';
import { QueryClientProvider } from "react-query";
import { ReactQueryClient } from './Config/ApiConfig'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react';

function App() {
  return (
      <QueryClientProvider client={ReactQueryClient}>
      <Router>
        <Nav />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/register/client' element={<RegisterClient />} />
          <Route path='/register/provider' element={<RegisterProvider />} />

          {/*<Route path="/register/client" element={ <RegisterClient/> } />*/}
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
      </QueryClientProvider>
  );
}

export default App;
