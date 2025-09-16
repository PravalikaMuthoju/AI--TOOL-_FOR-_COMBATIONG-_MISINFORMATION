import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { CheckNews } from '@/pages/CheckNews';
import { FactCheckReport } from '@/pages/FactCheckReport';
import { Trends } from '@/pages/Trends';
import { Education } from '@/pages/Education';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="check" element={<CheckNews />} />
                <Route path="reports" element={<FactCheckReport />} />
                <Route path="trends" element={<Trends />} />
                <Route path="education" element={<Education />} />
              </Route>
            </Routes>
          </div>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;