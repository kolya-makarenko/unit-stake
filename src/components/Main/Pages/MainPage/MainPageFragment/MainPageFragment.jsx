import { useNavigate } from 'react-router-dom';
import classes from './MainPageFragment.module.css';

import fragmentBoxImage1 from '../../../../../assets/images/mainPageImages/fragmentBoxImage1.png';
import fragmentBoxImage2 from '../../../../../assets/images/mainPageImages/fragmentBoxImage2.png';
import fragmentBoxImage3 from '../../../../../assets/images/mainPageImages/fragmentBoxImage3.png';
import arrowIcon from '../../../../../assets/images/mainPageImages/arrow.svg';

const MainPageFragment = () => {
    const navigate = useNavigate();
    return (
        <section className={`sectionMarginTop ${classes.fragment}`}>
            <div className="wrapper">
                <h2>From Fragmented Data to Market Intelligence</h2>
                <div className={classes.fragmentContainer}>
                    <div className={classes.fragmentBox}>
                        <div className={classes.fragmentBoxText}>
                            <h3>Looking for Assets?</h3>
                            <p>
                                Navigate the tokenized asset market with clarity
                                — using structured insights, project
                                verification, and standardized data.
                            </p>
                            <div className={classes.fragmentBoxTextFackeBtns}>
                                <div className={classes.fakeBtn}>
                                    <div className={classes.fakeBtnContainer}>
                                        <div
                                            className={classes.fakeBtnCircle}
                                        ></div>
                                        <p>Compare Platforms</p>
                                    </div>
                                </div>
                                <div className={classes.fakeBtn}>
                                    <div className={classes.fakeBtnContainer}>
                                        <div
                                            className={classes.fakeBtnCircle}
                                        ></div>
                                        <p>Read Research Reports</p>
                                    </div>
                                </div>
                                <div className={classes.fakeBtn}>
                                    <div className={classes.fakeBtnContainer}>
                                        <div
                                            className={classes.fakeBtnCircle}
                                        ></div>
                                        <p>Project Analysis</p>
                                    </div>
                                </div>
                                <div className={classes.fakeBtn}>
                                    <div className={classes.fakeBtnContainer}>
                                        <div
                                            className={classes.fakeBtnCircle}
                                        ></div>
                                        <p>Browse Projects</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                className={classes.fragmentBoxTextBtn}
                                onClick={() => navigate('/for-assets-owners')}
                            >
                                Explore More
                            </button>
                        </div>
                        <div className={classes.fragmentBoxImage}>
                            <img
                                src={fragmentBoxImage1}
                                alt="Fragment Box Image"
                            />
                        </div>
                    </div>
                    <div className={classes.fragmentBox}>
                        <div className={classes.fragmentBoxText}>
                            <h3>For Asset Owners</h3>
                            <p>
                                Explore how tokenisation can support asset
                                structuring, broaden market access, and position
                                assets within modern capital frameworks.
                            </p>
                            <div className={classes.fragmentBoxTextFackeBtns}>
                                <div className={classes.fakeBtn}>
                                    <div className={classes.fakeBtnContainer}>
                                        <div
                                            className={classes.fakeBtnCircle}
                                        ></div>
                                        <p>Submit Platform</p>
                                    </div>
                                </div>
                                <div className={classes.fakeBtn}>
                                    <div className={classes.fakeBtnContainer}>
                                        <div
                                            className={classes.fakeBtnCircle}
                                        ></div>
                                        <p>Marketing Solutions</p>
                                    </div>
                                </div>
                                <div className={classes.fakeBtn}>
                                    <div className={classes.fakeBtnContainer}>
                                        <div
                                            className={classes.fakeBtnCircle}
                                        ></div>
                                        <p>Partner</p>
                                    </div>
                                </div>
                                <div className={classes.fakeBtn}>
                                    <div className={classes.fakeBtnContainer}>
                                        <div
                                            className={classes.fakeBtnCircle}
                                        ></div>
                                        <p>List Your Project</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                className={classes.fragmentBoxTextBtn}
                                onClick={() => navigate('/for-assets-owners')}
                            >
                                Explore More
                            </button>
                        </div>
                        <div className={classes.fragmentBoxImage}>
                            <img
                                src={fragmentBoxImage2}
                                alt="Fragment Box Image"
                            />
                            <div
                                className={classes.fragmentBoxImageOverlay}
                            ></div>
                            <div className={classes.fragmentBoxImageMouse1}>
                                <img src={arrowIcon} alt="Arrow Icon" />
                                <span>Growth</span>
                            </div>
                            <div className={classes.fragmentBoxImageMouse2}>
                                <img src={arrowIcon} alt="Arrow Icon" />
                                <span>Liquidity</span>
                            </div>
                        </div>
                    </div>
                    <div className={classes.fragmentBox}>
                        <div className={classes.fragmentBoxText}>
                            <h3>Research & Insights</h3>
                            <p>
                                Develop a deeper understanding of how
                                tokenisation is reshaping real-world assets
                                through data, insights, and evolving market
                                frameworks.
                            </p>
                            <div className={classes.fragmentBoxTextFackeBtns}>
                                <div className={classes.fakeBtn}>
                                    <div className={classes.fakeBtnContainer}>
                                        <div
                                            className={classes.fakeBtnCircle}
                                        ></div>
                                        <p>Market Reports</p>
                                    </div>
                                </div>
                                <div className={classes.fakeBtn}>
                                    <div className={classes.fakeBtnContainer}>
                                        <div
                                            className={classes.fakeBtnCircle}
                                        ></div>
                                        <p>Platform Reviews</p>
                                    </div>
                                </div>
                                <div className={classes.fakeBtn}>
                                    <div className={classes.fakeBtnContainer}>
                                        <div
                                            className={classes.fakeBtnCircle}
                                        ></div>
                                        <p>Educational Content</p>
                                    </div>
                                </div>
                                <div className={classes.fakeBtn}>
                                    <div className={classes.fakeBtnContainer}>
                                        <div
                                            className={classes.fakeBtnCircle}
                                        ></div>
                                        <p>Regulatory Updates</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                className={classes.fragmentBoxTextBtn}
                                onClick={() => navigate('/insights')}
                            >
                                Explore More
                            </button>
                        </div>
                        <div className={classes.fragmentBoxImage}>
                            <img
                                src={fragmentBoxImage3}
                                alt="Fragment Box Image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainPageFragment;
