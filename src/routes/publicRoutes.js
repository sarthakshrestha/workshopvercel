import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/landingPage';

const PublicRoutes = [
  <Routes>
  <Route key="landing" path="/" element={<LandingPage />} />,
  // Add any other public routes here
  </Routes>
];

export default PublicRoutes;
