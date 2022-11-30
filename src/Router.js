import { Route, Routes } from 'react-router-dom';

import NotFound from './Pages/NotFound';
import ClientHome from './Pages/Client/ClientHome';
import ClientAccount from './Pages/Client/ClientAccount';
import IndexPage from './Pages/IndexPage';
import React from 'react';
import ProviderDashboard from './Pages/Provider/ProviderDashboard';
import Account from './Pages/Provider/tabs/Account';
import BusinessSettings from './Pages/Provider/tabs/BusinessSettings';
import Calendar from './Pages/Provider/Calendar';
import Bookings from './Pages/Provider/Bookings';
import {
  Login,
  RecoverPassword,
  RegisterClient,
  RegisterMain,
  RegisterProvider,
  UserForgotPassword
} from './Pages/Auth';
import { PrivateRoute, RestrictedForProviderRoute } from './PrivateRoute';
import MyTeam from './Pages/Provider/tabs/MyTeam';
export const Router = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <RestrictedForProviderRoute>
            <IndexPage />
          </RestrictedForProviderRoute>
        }
      />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/register' element={<RegisterMain />} />
      <Route exact path='/register/client' element={<RegisterClient />} />
      <Route exact path='/register/provider' element={<RegisterProvider />} />
      <Route
        path='/password/reset/:token/:email'
        element={<RecoverPassword />}
      />
      <Route path='/forgot-password' element={<UserForgotPassword />} />

      <Route
        path='/client'
        element={
          <PrivateRoute mustBeProvider={false}>
            <ClientHome />
          </PrivateRoute>
        }
      />
      <Route
        path='/client/account'
        element={
          <PrivateRoute mustBeProvider={false}>
            <ClientAccount />
          </PrivateRoute>
        }
      />
      <Route
        path='/provider'
        element={
          <PrivateRoute mustBeProvider={true}>
            <ProviderDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path='/calendar'
        element={
          <PrivateRoute mustBeProvider={true}>
            <Calendar />
          </PrivateRoute>
        }
      />
      <Route
        path='settings/user'
        element={
          <PrivateRoute mustBeProvider={true}>
            <Account />
          </PrivateRoute>
        }
      />
      <Route
        path='settings/business'
        element={
          <PrivateRoute mustBeProvider={true}>
            <BusinessSettings />
          </PrivateRoute>
        }
      />
      <Route
        path='my-team'
        element={
          <PrivateRoute mustBeProvider={true}>
            <MyTeam />
          </PrivateRoute>
        }
      />
      <Route
        path='/bookings'
        element={
          <PrivateRoute mustBeProvider={true}>
            <Bookings />
          </PrivateRoute>
        }
      />

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
