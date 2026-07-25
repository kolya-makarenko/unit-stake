import { useState, useEffect } from 'react';
import classes from './ExternalLink.module.css';

const ExternalLink = ({ isOpen, onClose, onConfirm, url }) => {
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
                        <p>You are leaving Unitstake</p>
                        <p>
                            You are about to be redirected to a third-party
                            website, independent of Unitstake. Unitstake does
                            not operate, endorse, or accept responsibility for
                            the content, products, or services available on that
                            website.
                        </p>
                    </div>
                    <button className={classes.btnConfirm} onClick={onConfirm}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExternalLink;
