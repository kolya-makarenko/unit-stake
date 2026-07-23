import classes from './AboutUsPageVerification.module.css';

import verificationImage from '../../../../../assets/images/AboutUsPageImages/aboutUsPageVerification.png';

const AboutUsPageVerification = () => {
    return (
        <section className={classes.verification}>
            <div className="wrapper">
                <div className={classes.verificationContainer}>
                    <div className={classes.verificationText}>
                        <h2>Verified by UnitStake</h2>
                        <p>
                            It’s a way to organise and present facts about a
                            project so users can better understand its
                            structure, level of transparency, and available
                            data.
                        </p>
                        <h4>
                            Verified by UnitStake is not a rating and not an
                            endorsement.
                        </h4>
                    </div>
                    <div className={classes.verificationImage}>
                        <img src={verificationImage} alt="verification image" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsPageVerification;
