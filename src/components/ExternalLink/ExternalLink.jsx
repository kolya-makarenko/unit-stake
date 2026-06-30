import { useState, useEffect } from 'react';
import classes from './ExternalLink.module.css';

const ExternalLink = ({ isOpen, onClose, onConfirm, url }) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsChecked(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={classes.modalOverlay}>
            <div className={classes.modalOverlayContainer}>
                <div className={classes.modalOverlayHeader}>
                    <h2>REDIRECT NOTICE</h2>
                    <button className={classes.btnCancel} onClick={onClose}>
                        <div className={classes.line1}></div>
                        <div className={classes.line2}></div>
                    </button>
                </div>
                <div className={classes.modalOverlayContent}>
                    <div className={classes.modalOverlayTxt}>
                        <p>
                            By accessing this link you are leaving{' '}
                            <span>unitstake.com</span> and are being redirected
                            to a third party, independent website.
                        </p>
                        <p>
                            This redirect will take you to the{' '}
                            <span>{url}</span>. Please read and agree to the
                            Terms and Conditions.
                        </p>
                    </div>
                    <label className={classes.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        I agree to the{' '}
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            Terms and Conditions
                        </a>
                    </label>
                    <button
                        className={classes.btnConfirm}
                        disabled={!isChecked}
                        onClick={onConfirm}
                    >
                        Go Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExternalLink;
