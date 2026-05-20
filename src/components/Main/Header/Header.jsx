import { NavLink, useNavigate } from 'react-router-dom';
import classes from './Header.module.css';

import logo from '../../../assets/images/logoWhite.svg';

const MENU_ITEMS = [
    { to: '/projects', label: 'Projects' },
    { to: '/platforms', label: 'Platforms' },
    { to: '/for-assets-owners', label: 'For Assets Owners' },
    { to: '/insights', label: 'Insights' },
    { to: '/academy', label: 'Academy' },
    { to: '/about-us', label: 'About Us' },
    { to: '/verifeid', label: 'Verifeid By UnitStake' },
];

const Header = () => {
    const navigate = useNavigate();

    const getNavLinkClass = ({ isActive }) => {
        return isActive
            ? `${classes.mainMenuLink} ${classes.active}`
            : classes.mainMenuLink;
    };

    return (
        <header className={classes.headerMain}>
            <div className="wrapper">
                <div className={classes.headerContainer}>
                    <div className={classes.mainMenuContainer}>
                        <NavLink to="/" className={classes.logoMain}>
                            <img src={logo} alt="logo" />
                        </NavLink>
                        <nav className={classes.mainNavigation}>
                            <ul>
                                {MENU_ITEMS.map((item, index) => (
                                    <li key={index}>
                                        <NavLink
                                            to={item.to}
                                            className={getNavLinkClass}
                                        >
                                            {item.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <button
                        className={classes.btnToContacts}
                        onClick={() => navigate('/contact-us')}
                    >
                        Contact Us
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
