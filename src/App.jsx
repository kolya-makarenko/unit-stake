import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import Admin from './components/Admin/Admin';

import MainPage from './components/Main/Pages/MainPage/MainPage';
import ProtectedRoute from './components/Admin/Login/ProtectedRoute';
import AdminDashboard from './components/Admin/AdminPages/AdminDashboard/AdminDashboard';
import AdminPlatforms from './components/Admin/AdminPages/AdminPlatforms/AdminPlatforms';
import AdminProjects from './components/Admin/AdminPages/AdminProjects/AdminProjects';
import AdminPartners from './components/Admin/AdminPages/AdminPartners/AdminPartners';
import AdminNews from './components/Admin/AdminPages/AdminNews/AdminNews';
import AdminAcademy from './components/Admin/AdminPages/AdminAcademy/AdminAcademy';
import AdminFAQ from './components/Admin/AdminPages/AdminFAQ/AdminFAQ';
import AdminCategories from './components/Admin/AdminPages/AdminCategories/AdminCategories';
import AdminPlatformAdd from './components/Admin/AdminPages/AdminPlatforms/AdminPlatformAdd/AdminPlatformAdd';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />}>
                    <Route index element={<MainPage />} />
                </Route>
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <Admin />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<AdminDashboard />} />
                    <Route path="platforms" element={<AdminPlatforms />} />
                    <Route path="projects" element={<AdminProjects />} />
                    <Route path="categories" element={<AdminCategories />} />
                    <Route path="partners" element={<AdminPartners />} />
                    <Route path="news" element={<AdminNews />} />
                    <Route path="academy" element={<AdminAcademy />} />
                    <Route path="faq" element={<AdminFAQ />} />
                    <Route
                        path="platforms/add"
                        element={<AdminPlatformAdd />}
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
