// src/App.js
import React from 'react';
import { Button } from '@/components/ui/button';
import LandingPage from './pages/landingPage';
import AdminSidebar from './pages/admin/adminSidebar';

function App() {
  return (
    <div className="App">
    {/* <LandingPage/>   */}
    <AdminSidebar/>
    </div>
  );
}

export default App;
