import classes from './VerifiedPageHeroSection.module.css';

import verifeidIcon from '../../../../../assets/images/icons/verifeid.svg';

const VerifiedPageHeroSection = () => {
    return (
        <section className={classes.heroSection}>
            <div className="wrapper">
                <div className={classes.heroSectionContainer}>
                    <div className="verifeidBox">
                        <img src={verifeidIcon} alt="verifeid" />
                        Verified By UnitStake
                    </div>
                    <h2>Structured Verification. Greater Transparency.</h2>
                    <p>
                        Verified by Unit Stake is not a rating, endorsement, or
                        investment recommendation. It is a structured
                        verification of disclosed project information and
                        publicly available data.
                    </p>
                    <p>
                        We do not evaluate whether a project is “good” or “bad.”
                        We do not assign scores or predict future performance.
                        We verify disclosed information using a clear and
                        transparent methodology.
                    </p>
                    <a href="#">
                        <svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0.666016 0.666626L4.66602 4.66663L8.66602 0.666626"
                                stroke="#D34329"
                                strokeWidth="1.33333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Scroll to explore
                    </a>
                </div>
            </div>
        </section>
    );
};

export default VerifiedPageHeroSection;
