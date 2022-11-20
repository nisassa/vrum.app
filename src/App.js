import './App.css';
import { QueryClientProvider } from "react-query";
import { ReactQueryClient } from './config/apiConfig'
import { BrowserRouter as Router} from 'react-router-dom';
import { ProfileProvider } from './hooks/profile'
import React from 'react';

import {Router as MainRouter} from './Router';
import MainNav from "./Navigation/MainNav";

function App() {
  return (
      <QueryClientProvider client={ReactQueryClient}>
        <ProfileProvider >
            <Router>
                <MainNav />
                <MainRouter />
            </Router>
        </ProfileProvider>
      </QueryClientProvider>
  );
}

export default App;
