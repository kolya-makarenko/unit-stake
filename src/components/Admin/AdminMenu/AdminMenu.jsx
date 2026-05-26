import { NavLink, useNavigate } from 'react-router-dom';
import { account } from '../../../lib/appwrite';
import classes from './AdminMenu.module.css';

import logo from '../../../assets/images/logo.svg';

const NAV_ITEMS = [
    { to: '/admin', label: 'Dashboard', end: true },
    { to: '/admin/platforms', label: 'Platforms' },
    { to: '/admin/projects', label: 'Projects' },
    { to: '/admin/categories', label: 'Categories' },
    { to: '/admin/partners', label: 'Partners' },
    { to: '/admin/news', label: 'News & Articles' },
    { to: '/admin/academy', label: 'Academy' },
    { to: '/admin/faq', label: 'FAQ' },
    { to: '/admin/teams', label: 'Teams' },
];

const AdminMenu = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await account.deleteSession('current');

            navigate('/');
        } catch (error) {
            console.error('Error while logging out:', error.message);
            alert('Failed to log out of the system');
        }
    };

    const getNavLinkClass = ({ isActive }) => {
        return isActive
            ? `${classes.adminNavigationItem} ${classes.active}`
            : classes.adminNavigationItem;
    };

    return (
        <aside className={classes.adminMenu}>
            <div className={classes.adminNavigationContainer}>
                <div className={classes.adminMenuHeader}>
                    <NavLink to="/" className={classes.adminMenuLogo}>
                        <img src={logo} alt="logo" />
                    </NavLink>
                    <h2>Admin Panel</h2>
                </div>
                <nav className={classes.adminNavigation}>
                    <ul>
                        {NAV_ITEMS.map((item) => (
                            <li key={item.to}>
                                <NavLink
                                    to={item.to}
                                    end={item.end}
                                    className={getNavLinkClass}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <button onClick={handleLogout} className={classes.LogoutBtn}>
                Logout
            </button>
        </aside>
    );
};

export default AdminMenu;
