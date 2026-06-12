import classes from './VerifiedPagePlatform.module.css';

import platformCardImage1 from '../../../../../assets/images/verifiedPageImages/platformCardImage1.png';
import platformCardImage2 from '../../../../../assets/images/verifiedPageImages/platformCardImage2.png';

const VerifiedPagePlatform = () => {
    return (
        <section className={classes.platform}>
            <div className="wrapper">
                <div className={classes.platformContainer}>
                    <div className={classes.platformCard}>
                        <div className={classes.platformCardText}>
                            <h2>For Platform Users</h2>
                            <p>
                                Access structured disclosures and verified
                                project information.
                            </p>
                            <button>Explore Verified Projects</button>
                        </div>
                        <div className={classes.platformCardImage}>
                            <img
                                src={platformCardImage1}
                                alt="platform image"
                            />
                        </div>
                    </div>
                    <div className={classes.platformCard}>
                        <div className={classes.platformCardText}>
                            <h2>For Asset Owners</h2>
                            <p>
                                Present your project with structured, verified
                                disclosures through UnitStake.
                            </p>
                            <button>
                                Submit Your Project for Verification
                            </button>
                        </div>
                        <div className={classes.platformCardImage}>
                            <img
                                src={platformCardImage2}
                                alt="platform image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VerifiedPagePlatform;
