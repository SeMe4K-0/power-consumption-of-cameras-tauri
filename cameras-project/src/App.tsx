import { type FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { HomePage } from './pages/HomePage/HomePage';
import { CamerasPage } from './pages/CamerasPage/CamerasPage';
import { CamerasDetailPage } from './pages/CamerasDetailPage/CamerasDetailPage';
import { ROUTES } from './constants/routes';
import './App.css';

const App: FC = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.CAMERAS} element={<CamerasPage />} />
          <Route path={`${ROUTES.CAMERAS}/:id`} element={<CamerasDetailPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
