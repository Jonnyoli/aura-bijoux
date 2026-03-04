
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './store';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Catalog from '@/pages/Catalog';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Profile from '@/pages/Profile';
import Admin from '@/pages/Admin';
import Login from '@/pages/Login';
import FAQ from '@/pages/FAQ';
import OrderDetails from '@/pages/OrderDetails';
import Shipping from '@/pages/Shipping';
import Contact from '@/pages/Contact';
import About from '@/pages/About';
import Care from '@/pages/Care';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Success from '@/pages/Success';
import Cancel from '@/pages/Cancel';
import VideoShopping from '@/components/VideoShopping';
import ScrollToTop from '@/components/ScrollToTop';
import CookieBanner from '@/components/CookieBanner';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useApp();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Strict check for exactly this email
  if (user.email !== 'sonia@aurabijoux.pt') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useApp();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Routes location={location}>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/catalog" element={<Layout><Catalog /></Layout>} />
        <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/profile" element={<Layout><PrivateRoute><Profile /></PrivateRoute></Layout>} />
        <Route path="/order/:id" element={<Layout><PrivateRoute><OrderDetails /></PrivateRoute></Layout>} />
        <Route path="/faq" element={<Layout><FAQ /></Layout>} />
        <Route path="/shipping" element={<Layout><Shipping /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/care" element={<Layout><Care /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
        <Route path="/terms" element={<Layout><Terms /></Layout>} />
        <Route path="/success" element={<Layout><Success /></Layout>} />
        <Route path="/cancel" element={<Layout><Cancel /></Layout>} />
        <Route path="/video-shopping" element={<VideoShopping />} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <CookieBanner />
    </>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;
