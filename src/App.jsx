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
import AdminPlatformEdit from './components/Admin/AdminPages/AdminPlatforms/AdminPlatformEdit/AdminPlatformEdit';
import AdminMail from './components/Admin/AdminPages/AdminDashboard/AdminMails/AdminMail/AdminMail';
import AdminTeams from './components/Admin/AdminPages/AdminTeams/AdminTeams';
import AdminProjectAdd from './components/Admin/AdminPages/AdminProjects/AdminProjectAdd/AdminProjectAdd';
import AdminProjectEdit from './components/Admin/AdminPages/AdminProjects/AdminProjectEdit/AdminProjectEdit';
import AssetsPage from './components/Main/Pages/AssetsPage/AssetsPage';
import AboutUsPage from './components/Main/Pages/AboutUsPage/AboutUsPage';
import VerifiedPage from './components/Main/Pages/VerifiedPage/VerifiedPage';
import PlatformsPage from './components/Main/Pages/PlatformsPage/PlatformsPage';
import ProjectsPage from './components/Main/Pages/ProjectsPage/ProjectsPage';
import PlatformPage from './components/Main/Pages/PlatformsPage/PlatformPage/PlatformPage';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />}>
                    <Route index element={<MainPage />} />
                    <Route path="projects" element={<ProjectsPage />} />
                    <Route path="projects/:id" element={<div>PROJECT</div>} />
                    <Route path="platforms" element={<PlatformsPage />} />
                    <Route path="platforms/:id" element={<PlatformPage />} />
                    <Route path="for-assets-owners" element={<AssetsPage />} />
                    <Route path="partner/:id" element={<div>PARTNER</div>} />
                    <Route path="insights" element={<div>Insights</div>} />
                    <Route path="insights/:id" element={<div>Insight</div>} />
                    <Route path="academy" element={<div>Academy</div>} />
                    <Route path="about-us" element={<AboutUsPage />} />
                    <Route path="verified" element={<VerifiedPage />} />
                    <Route path="contact-us" element={<div>Contact us</div>} />
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
                    <Route path="teams" element={<AdminTeams />} />
                    <Route path="mail/:id" element={<AdminMail />} />
                    <Route
                        path="platforms/add"
                        element={<AdminPlatformAdd />}
                    />
                    <Route
                        path="platforms/edit/:id"
                        element={<AdminPlatformEdit />}
                    />
                    <Route path="projects/add" element={<AdminProjectAdd />} />
                    <Route
                        path="projects/edit/:id"
                        element={<AdminProjectEdit />}
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
