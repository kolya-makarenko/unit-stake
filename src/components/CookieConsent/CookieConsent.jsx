import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './CookieConsent.module.css';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsVisible(false);
    };

    const handleRejectAll = () => {
        localStorage.setItem('cookieConsent', 'rejected');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={classes.cookieBannerOverlay}>
            <div className={classes.cookieBanner}>
                <div className={classes.cookieContent}>
                    <h3>We value your privacy</h3>
                    <p>
                        We use cookies to enhance your experience, serve
                        personalised ads or content, and analyse our traffic. By
                        clicking "Accept All", you consent to our use of
                        cookies.{' '}
                        <NavLink
                            to="/privacy-policy"
                            className={classes.legalLink}
                        >
                            Privacy Policy
                        </NavLink>
                        .
                    </p>
                </div>
                <div className={classes.cookieActions}>
                    <button
                        className={`${classes.cookieBtn} ${classes.cookieBtnReject}`}
                        onClick={handleRejectAll}
                    >
                        Reject all
                    </button>
                    <button
                        className={`${classes.cookieBtn} ${classes.cookieBtnAccept}`}
                        onClick={handleAcceptAll}
                    >
                        Accept all
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
