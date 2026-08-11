import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './CookieConsent.module.css';

const DEFAULT_PREFERENCES = {
    necessary: true,
    functional: false,
    analytical: false,
    advertisement: false,
};

const CookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');

        if (!consent) {
            setShowBanner(true);
            return;
        }

        try {
            const savedPrefs = JSON.parse(consent);

            if (typeof savedPrefs === 'object' && savedPrefs !== null) {
                setPreferences({ ...savedPrefs, necessary: true });
            } else {
                setShowBanner(true);
            }
        } catch (e) {
            if (consent === 'accepted') {
                setPreferences({
                    necessary: true,
                    functional: true,
                    analytical: true,
                    advertisement: true,
                });
            } else if (consent === 'rejected') {
                setPreferences({
                    necessary: true,
                    functional: false,
                    analytical: false,
                    advertisement: false,
                });
            } else {
                setShowBanner(true);
            }
        }
    }, []);

    const handleCategoryChange = (category) => (event) => {
        if (category === 'necessary') return;

        setPreferences((prev) => ({
            ...prev,
            [category]: event.target.checked,
        }));
    };

    const saveAndClose = (prefs) => {
        localStorage.setItem('cookieConsent', JSON.stringify(prefs));
        setShowBanner(false);
        setShowModal(false);
    };

    const handleSavePreferences = () => {
        saveAndClose(preferences);
    };

    const handleAcceptAll = () => {
        const allAccepted = {
            necessary: true,
            functional: true,
            analytical: true,
            advertisement: true,
        };
        setPreferences(allAccepted);
        saveAndClose(allAccepted);
    };

    const handleRejectAll = () => {
        const allRejected = {
            necessary: true,
            functional: false,
            analytical: false,
            advertisement: false,
        };
        setPreferences(allRejected);
        saveAndClose(allRejected);
    };

    if (!showBanner && !showModal) return null;

    return (
        <>
            {showModal && (
                <div className={classes.cookieOverlay}>
                    <div className={classes.cookiePreferencesModal}>
                        <div className={classes.modalHeader}>
                            <h2>Cookies preferences</h2>
                        </div>

                        <div className={classes.modalInfo}>
                            <p>
                                Manage your cookie settings below. Necessary
                                cookies are always active. All other categories
                                are optional and require your consent.
                            </p>
                        </div>

                        <div className={classes.categoriesList}>
                            <div className={classes.categoryRow}>
                                <div className={classes.categoryDetails}>
                                    <h3>Necessary</h3>
                                    <p>
                                        Necessary cookies are required to enable
                                        the basic features of this platform,
                                        such as secure log-in or page
                                        navigation. They do not store any
                                        personally identifiable data.
                                    </p>
                                </div>
                                <div className={classes.categoryStatus}>
                                    Always Active
                                </div>
                            </div>

                            <div className={classes.categoryRow}>
                                <div className={classes.categoryDetails}>
                                    <h3>Functional</h3>
                                    <p>
                                        Functional cookies enable us to remember
                                        your preferences and settings, such as
                                        your preferred language or region.
                                    </p>
                                </div>
                                <div className={classes.categoryControl}>
                                    <label className={classes.switch}>
                                        <input
                                            type="checkbox"
                                            checked={preferences.functional}
                                            onChange={handleCategoryChange(
                                                'functional',
                                            )}
                                        />
                                        <span
                                            className={`${classes.slider} ${classes.round}`}
                                        ></span>
                                    </label>
                                </div>
                            </div>

                            <div className={classes.categoryRow}>
                                <div className={classes.categoryDetails}>
                                    <h3>Analytical</h3>
                                    <p>
                                        Analytical cookies help us to understand
                                        how visitors interact with this
                                        platform, such as pages visited, session
                                        duration, and traffic sources, so we can
                                        improve your user experience.
                                    </p>
                                </div>
                                <div className={classes.categoryControl}>
                                    <label className={classes.switch}>
                                        <input
                                            type="checkbox"
                                            checked={preferences.analytical}
                                            onChange={handleCategoryChange(
                                                'analytical',
                                            )}
                                        />
                                        <span
                                            className={`${classes.slider} ${classes.round}`}
                                        ></span>
                                    </label>
                                </div>
                            </div>

                            <div className={classes.categoryRow}>
                                <div className={classes.categoryDetails}>
                                    <h3>Advertisement</h3>
                                    <p>
                                        Advertisement cookies allow us to
                                        provide you with customised
                                        advertisements based on your browsing
                                        activity, and to analyse the
                                        effectiveness of our ad campaigns.
                                    </p>
                                </div>
                                <div className={classes.categoryControl}>
                                    <label className={classes.switch}>
                                        <input
                                            type="checkbox"
                                            checked={preferences.advertisement}
                                            onChange={handleCategoryChange(
                                                'advertisement',
                                            )}
                                        />
                                        <span
                                            className={`${classes.slider} ${classes.round}`}
                                        ></span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className={classes.cookieActions}>
                            <button
                                className={`${classes.cookieBtn} ${classes.cookieBtnAccept}`}
                                onClick={handleSavePreferences}
                            >
                                Save my preferences
                            </button>
                            <div className={classes.cookieActionsRight}>
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
                </div>
            )}

            {showBanner && !showModal && (
                <div className={classes.cookieBannerOverlay}>
                    <div className={classes.cookieBanner}>
                        <div className={classes.cookieContent}>
                            <h3>We value your privacy</h3>
                            <p>
                                We use cookies to enhance your experience, serve
                                personalised ads or content, and analyse our
                                traffic. By clicking "Accept All", you consent
                                to our use of cookies.{' '}
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
                                className={`${classes.cookieBtn} ${classes.cookieBtnAccept}`}
                                onClick={() => setShowModal(true)}
                            >
                                Customize
                            </button>
                            <div className={classes.cookieActionsRight}>
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
                </div>
            )}
        </>
    );
};

export default CookieConsent;
