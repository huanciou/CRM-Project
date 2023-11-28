import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfileComponent from './components/ProfileComponent';
import CardComponent from './components/CardComponent';
import './styles/style.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/profile/info" element={<ProfileComponent />} />
        <Route path="/user/profile/card" element={<CardComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
