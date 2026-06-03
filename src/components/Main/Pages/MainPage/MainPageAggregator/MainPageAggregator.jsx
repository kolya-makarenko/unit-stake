import classes from './MainPageAggregator.module.css';

import verifeidIcon from '../../../../../assets/images/icons/verifeid.svg';
import pazlIcon1 from '../../../../../assets/images/mainPageImages/pazl1.svg';
import pazlIcon2 from '../../../../../assets/images/mainPageImages/pazl2.svg';
import pazlIcon3 from '../../../../../assets/images/mainPageImages/pazl3.svg';
import pazlIcon4 from '../../../../../assets/images/mainPageImages/pazl4.svg';
import arrowIcon from '../../../../../assets/images/mainPageImages/arrow.svg';
import checkmarkIcon from '../../../../../assets/images/icons/checkmark.svg';

const MainPageAggregator = () => {
    return (
        <section className={`sectionMarginTop ${classes.aggregator}`}>
            <div className="wrapper">
                <p className={classes.aggregatorSimpleText}>
                    Structured data. Independent overview. Clear market
                    navigation.
                </p>
                <h2>
                    UnitStake Aggregator — Clear Market Navigation for Tokenized
                    Assets
                </h2>
                <div className={classes.aggregatorContainer}>
                    <div className={classes.aggregatorBox}>
                        <div className={classes.aggregatorBoxBorder}>
                            <h3>Everything in one place</h3>
                            <p>
                                You don’t need to jump between different
                                websites — we’ve already gathered and organised
                                everything for you
                            </p>
                            <div className={classes.aggregatorBoxListContainer}>
                                <div className={classes.aggregatorBoxList}>
                                    <h4>TRA Price Statistics</h4>
                                    <h5>TRA Marketplace Price today</h5>
                                    <ul>
                                        <li>
                                            Total Asset Value
                                            <span>$5,000,000</span>
                                        </li>
                                        <li>
                                            Legal Framework
                                            <span>SPV Structure</span>
                                        </li>
                                        <li>
                                            Jurisdiction
                                            <span>United Kingdom</span>
                                        </li>
                                        <li>
                                            Verification Layer
                                            <span>Available</span>
                                        </li>
                                        <li>
                                            Transparency Level
                                            <span>High</span>
                                        </li>
                                        <li>
                                            Volume/Marketcap
                                            <span>0.5632</span>
                                        </li>
                                        <li>
                                            Market Dominance
                                            <span>13.51%</span>
                                        </li>
                                        <li>
                                            Market Rank
                                            <span>#6227</span>
                                        </li>
                                    </ul>
                                    <h5>TRA NFTs Marketplace Market Cap</h5>
                                    <ul>
                                        <li>
                                            Market Cap
                                            <span>
                                                $416,491.167
                                                <strong
                                                    className={
                                                        classes.aggregatorBoxListStrongRed
                                                    }
                                                >
                                                    <svg
                                                        width="5"
                                                        height="3"
                                                        viewBox="0 0 5 3"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M0.500732 0.500635L2.50352 2.50342L4.5063 0.500635"
                                                            stroke="#FF4775"
                                                            strokeWidth="1.00139"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    0.78%
                                                </strong>
                                            </span>
                                        </li>
                                        <li>
                                            Fully Diluted Market Cap
                                            <span>
                                                $416,491.167
                                                <strong
                                                    className={
                                                        classes.aggregatorBoxListStrongGreen
                                                    }
                                                >
                                                    <svg
                                                        width="5"
                                                        height="3"
                                                        viewBox="0 0 5 3"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M4.50635 2.50327L2.50356 0.500488L0.500782 2.50327"
                                                            stroke="#75EA2C"
                                                            strokeWidth="1.00139"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    0.12%
                                                </strong>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.aggregatorBox}>
                        <div className={classes.aggregatorBoxBorder}>
                            <h3>Confidence in your decisions</h3>
                            <p>
                                When everything is clear, it’s much easier to
                                make decisions without doubt
                            </p>
                            <div className={classes.aggregatorBoxImage}>
                                <img
                                    src={pazlIcon1}
                                    alt="Pazl"
                                    className={classes.aggregatorBoxImage1}
                                />
                                <img
                                    src={pazlIcon2}
                                    alt="Pazl"
                                    className={classes.aggregatorBoxImage2}
                                />
                                <img
                                    src={pazlIcon3}
                                    alt="Pazl"
                                    className={classes.aggregatorBoxImage3}
                                />
                                <img
                                    src={pazlIcon4}
                                    alt="Pazl"
                                    className={classes.aggregatorBoxImage4}
                                />
                                <div
                                    className={classes.aggregatorBoxImageMouse1}
                                >
                                    <img src={arrowIcon} alt="arrow" />
                                    <p>Overview</p>
                                </div>
                                <div
                                    className={classes.aggregatorBoxImageMouse2}
                                >
                                    <img src={arrowIcon} alt="arrow" />
                                    <p>Explore</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.aggregatorBox}>
                        <div className={classes.aggregatorBoxBorder}>
                            <div className="verifeidBox">
                                <img src={verifeidIcon} alt="verifeid" />
                                Verifeid By UnitStake
                            </div>
                            <p>
                                Certain projects are independently reviewed and
                                structured — helping you identify stronger, more
                                transparent opportunities.
                            </p>
                            <div className={classes.aggregatorBoxVerifeidList}>
                                <div
                                    className={
                                        classes.aggregatorBoxVerifeidListContainer
                                    }
                                >
                                    <ul>
                                        <li>
                                            <p>Legal</p>
                                            <div
                                                className={
                                                    classes.aggregatorBoxVerifeidListCheck
                                                }
                                            >
                                                <img
                                                    src={checkmarkIcon}
                                                    alt="checkmark"
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <p>Financials</p>
                                            <div
                                                className={
                                                    classes.aggregatorBoxVerifeidListCheck
                                                }
                                            >
                                                <img
                                                    src={checkmarkIcon}
                                                    alt="checkmark"
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <p>Team KYC</p>
                                            <div
                                                className={
                                                    classes.aggregatorBoxVerifeidListCheck
                                                }
                                            >
                                                <img
                                                    src={checkmarkIcon}
                                                    alt="checkmark"
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <p>Reputation</p>
                                            <div
                                                className={
                                                    classes.aggregatorBoxVerifeidListCheck
                                                }
                                            >
                                                <img
                                                    src={checkmarkIcon}
                                                    alt="checkmark"
                                                />
                                            </div>
                                        </li>
                                        <li>
                                            <p>Tech Verification</p>
                                            <div
                                                className={
                                                    classes.aggregatorBoxVerifeidListCheck
                                                }
                                            >
                                                <img
                                                    src={checkmarkIcon}
                                                    alt="checkmark"
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.aggregatorBox}>
                        <div className={classes.aggregatorBoxBorder}>
                            <h3>Simple way to explore the market</h3>
                            <p>
                                Instead of chaos and scattered information, you
                                get a clean and structured overview
                            </p>
                            <div className={classes.aggregatorBoxImage}></div>
                        </div>
                    </div>
                    <div className={classes.aggregatorBox}>
                        <div className={classes.aggregatorBoxBorder}>
                            <h3>Clear understanding of every project</h3>
                            <p>
                                You can easily see how each project works, what
                                stands behind it, and what you’re actually
                                looking at
                            </p>
                            <div className={classes.aggregatorBoxImage}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainPageAggregator;
