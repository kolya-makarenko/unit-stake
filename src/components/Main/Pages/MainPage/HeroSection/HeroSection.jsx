import { useNavigate, NavLink } from 'react-router-dom';
import classes from './HeroSection.module.css';
import graphics from '../../../../../assets/images/mainPageImages/heroSectionImg.svg';

const svgArrow = (
    <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1 15.2758L15 1"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
        />
        <path
            d="M15 12.0761V1.1C15 1.04477 14.9553 1 14.9 1H4.0752"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
        />
    </svg>
);

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className={classes.heroSection}>
            <div className="wrapper">
                <div className={classes.heroSectionContainer}>
                    <div className={classes.heroSectionTxt}>
                        <div className={classes.fakeBtn}>
                            <div className={classes.fakeBtnContainer}>
                                <div className={classes.fakeBtnCircle}></div>
                                <p>The Trusted Gateway to Tokenization</p>
                            </div>
                        </div>
                        <h1>
                            Navigate tokenised real-world assets with clarity,
                            structure, and confidence
                        </h1>
                        <p className={classes.heroSectionSecondaryTxt}>
                            Access structured information on tokenized asset
                            platforms, projects, and ecosystem
                            participants—focused on clarity, context, and
                            confidence in a rapidly evolving market.
                        </p>
                        <div className={classes.heroSectionBtns}>
                            <button
                                className={classes.heroSectionBtnProjects}
                                onClick={() => navigate('/projects')}
                            >
                                Explore Projects
                            </button>
                            <button
                                className={classes.heroSectionBtnPlatforms}
                                onClick={() => navigate('/platforms')}
                            >
                                View Platforms
                            </button>
                        </div>
                        <div className={classes.heroSectionLinks}>
                            <NavLink
                                to="/platforms"
                                className={classes.heroSectionLink}
                            >
                                <span>View All Platforms</span>
                                {svgArrow}
                            </NavLink>
                            <NavLink
                                to="/for-assets-owners"
                                className={classes.heroSectionLink}
                            >
                                <span>Featured Opportunities</span>
                                {svgArrow}
                            </NavLink>
                            <NavLink
                                to="/insights"
                                className={classes.heroSectionLink}
                            >
                                <span>Latest Insights</span>
                                {svgArrow}
                            </NavLink>
                        </div>
                    </div>
                    <div className={classes.heroSectionImg}>
                        <img src={graphics} alt="graphics" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
