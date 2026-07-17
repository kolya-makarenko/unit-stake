import { useState } from 'react';
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
    { to: '/verified', label: 'Verified By UnitStake' },
];

const Header = () => {
    const [isMenuActive, setIsMenuActive] = useState(false);
    const navigate = useNavigate();

    const getNavLinkClass = ({ isActive }) => {
        return isActive
            ? `${classes.mainMenuLink} ${classes.active}`
            : classes.mainMenuLink;
    };

    const openMobileMenu = () => {
        setIsMenuActive(!isMenuActive);
    };

    return (
        <header className={classes.headerMain}>
            <div className="wrapper">
                <div className={classes.headerContainer}>
                    <div className={classes.mainMenuContainer}>
                        <NavLink to="/" className={classes.logoMain}>
                            <img src={logo} alt="logo" />
                        </NavLink>
                        <nav
                            className={
                                isMenuActive
                                    ? `${classes.mainNavigation} ${classes.active}`
                                    : classes.mainNavigation
                            }
                        >
                            <ul>
                                {MENU_ITEMS.map((item, index) => (
                                    <li key={index}>
                                        <NavLink
                                            to={item.to}
                                            className={getNavLinkClass}
                                            onClick={openMobileMenu}
                                        >
                                            {item.label}
                                        </NavLink>
                                    </li>
                                ))}
                                <li className={classes.toContactsLink}>
                                    <NavLink
                                        to="/contact-us"
                                        className={getNavLinkClass}
                                        onClick={openMobileMenu}
                                    >
                                        STAY UPDATED
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                        <div
                            className={
                                isMenuActive
                                    ? `${classes.burger} ${classes.active}`
                                    : classes.burger
                            }
                            onClick={openMobileMenu}
                        >
                            <div className={classes.burgerLine1}></div>
                            <div className={classes.burgerLine2}></div>
                            <div className={classes.burgerLine3}></div>
                        </div>
                    </div>
                    <button
                        className={classes.btnToContacts}
                        onClick={() => navigate('/contact-us')}
                    >
                        STAY UPDATED
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
