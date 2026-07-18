import { useNavigate } from 'react-router-dom';
import classes from './AssetsPageHeroSection.module.css';

import graphics from '../../../../../assets/images/mainPageImages/heroSectionImg.png';
import ChecklistUnitStake from '../../../../../assets/documents/Checklist_UnitStake.pdf';

const AssetsPageHeroSection = () => {
    const navigate = useNavigate();
    return (
        <section className={classes.heroSection}>
            <div className="wrapper">
                <div className={classes.heroSectionContainer}>
                    <div className={classes.heroSectionTxt}>
                        <h2>Unlock New Opportunity of your Real Assets</h2>
                        <p className={classes.heroSectionSecondaryTxt}>
                            Explore how tokenization becomes a strategic tool
                            for raising capital into assets and scaling
                            businesses — unlocking new formats of investor
                            participation, liquidity, and capital growth, while
                            enabling access to a global pool of investors
                        </p>
                        <div className={classes.heroSectionBtns}>
                            <button
                                className={classes.heroSectionBtnProjects}
                                onClick={() => navigate('/contact-us')}
                            >
                                Explore Tokenization Path
                            </button>
                            <a
                                href={ChecklistUnitStake}
                                download={ChecklistUnitStake}
                                className={classes.heroSectionBtnPlatforms}
                            >
                                Get Free Owner Checklist
                            </a>
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

export default AssetsPageHeroSection;
