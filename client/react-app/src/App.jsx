import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfileComponent from './components/ProfileComponent';
import CardComponent from './components/CardComponent';
import CreditsComponent from './components/CreditsComponent';
import HistoryComponent from './components/HistoryComponent';
import StoreInfoComponent from './components/StoreInfoComponent';
import LoginPage from './components/Admin/LoginPage';
import FormPage from './components/Admin/FormPage';
import OrderPage from './components/Admin/OrderPage';
import CheckoutPage from './components/Admin/CheckoutPage';
import DashboardPage from './components/Admin/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/menuSetup" element={<FormPage />} />
        <Route path="/admin/order" element={<OrderPage />} />
        <Route path="/admin/checkout" element={<CheckoutPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />

        <Route path="/user/profile/info" element={<ProfileComponent />} />
        <Route path="/user/profile/card" element={<CardComponent />} />
        <Route path="/user/profile/credits" element={<CreditsComponent />} />
        <Route path="/user/profile/history" element={<HistoryComponent />} />
        <Route
          path="/user/profile/StoreInfo"
          element={<StoreInfoComponent />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
