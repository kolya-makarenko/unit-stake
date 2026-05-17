import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import Admin from './components/Admin/Admin';

import MainPage from './components/Main/Pages/MainPage/MainPage';
import ProtectedRoute from './components/Admin/Login/ProtectedRoute';
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
                    <Route index element={<div>Main</div>} />
                    <Route path="platforms" element={<div>Platforms</div>} />
                    <Route path="projects" element={<div>Projects</div>} />
                    <Route path="partners" element={<div>Partners</div>} />
                    <Route path="news" element={<div>News & Articles</div>} />
                    <Route path="academy" element={<div>Academy</div>} />
                    <Route path="faq" element={<div>FAQ</div>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
