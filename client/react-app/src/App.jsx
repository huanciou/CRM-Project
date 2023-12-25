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
import DashboardPage from './components/Admin/DashboardPage';
import CommentsPage from './components/CommentsPage';
import HomePage from './components/Admin/HomePage';
import { ParallaxProvider } from 'react-scroll-parallax';
import ProtectedRoute from './components/Admin/ProtectedRoute';

const App = () => {
  return (
    <ParallaxProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/admin/login" element={<LoginPage />} />

          <Route
            path="/admin/menuSetup"
            element={
              <ProtectedRoute>
                <FormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/order"
            element={
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route path="/user/profile/info" element={<ProfileComponent />} />
          <Route path="/user/profile/card" element={<CardComponent />} />
          <Route path="/user/profile/credits" element={<CreditsComponent />} />
          <Route path="/user/profile/history" element={<HistoryComponent />} />
          <Route path="/user/profile/comments" element={<CommentsPage />} />
          <Route
            path="/user/profile/StoreInfo"
            element={<StoreInfoComponent />}
          />
        </Routes>
      </BrowserRouter>
    </ParallaxProvider>
  );
};

export default App;
