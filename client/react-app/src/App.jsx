import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfileComponent from './components/ProfileComponent';
import CardComponent from './components/CardComponent';
import CreditsComponent from './components/CreditsComponent';
import HistoryComponent from './components/HistoryComponent';
import StoreInfoComponent from './components/StoreInfoComponent';
import './styles/style.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
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
