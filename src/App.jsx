import React, {useState, useEffect} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import SuccessPage from './pages/SuccessPage';
import EventsPage from './pages/EventsPage';

import StaffPage from './pages/StaffPage';
import VenuePage from './pages/VenuePage';
import './styles/app.css';

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [location.pathname]);

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <div className={`app-wrapper ${loading ? 'app-hidden' : 'app-visible'}`}>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />

            <Route path='/events' element={<EventsPage />} />
            <Route path='/staff' element={<StaffPage />} />
            <Route path='/venue' element={<VenuePage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/success' element={<SuccessPage />} />

            <Route path='*' element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
