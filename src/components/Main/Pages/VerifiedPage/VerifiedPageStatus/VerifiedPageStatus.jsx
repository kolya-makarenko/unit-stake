import classes from './VerifiedPageStatus.module.css';

import checkmarkIcon from '../../../../../assets/images/icons/checkmark.svg';

const VerifiedPageStatus = () => {
    return (
        <section className={classes.status}>
            <div className="wrapper">
                <div className={classes.statusContainer}>
                    <div className={classes.statusBox}>
                        <h3>What Verified Status Provides to Platform Users</h3>
                        <p>
                            Verified by UnitStake helps users better understand
                            what information has been disclosed and reviewed,
                            including:
                        </p>
                        <ul>
                            <li>
                                <div className={classes.checkmark}>
                                    <img
                                        src={checkmarkIcon}
                                        alt="checkmark icon"
                                    />
                                </div>
                                Whether the existence of the legal entity or
                                asset has been confirmed based on publicly
                                available registers.
                            </li>
                            <li>
                                <div className={classes.checkmark}>
                                    <img
                                        src={checkmarkIcon}
                                        alt="checkmark icon"
                                    />
                                </div>
                                What financial information has been disclosed
                                and the extent to which it appears internally
                                consistent.
                            </li>
                            <li>
                                <div className={classes.checkmark}>
                                    <img
                                        src={checkmarkIcon}
                                        alt="checkmark icon"
                                    />
                                </div>
                                Whether the identities of key team members have
                                been verified through publicly available
                                information or the documents provided.
                            </li>
                            <li>
                                <div className={classes.checkmark}>
                                    <img
                                        src={checkmarkIcon}
                                        alt="checkmark icon"
                                    />
                                </div>
                                Whether there is any adverse or negative
                                information regarding the project or its team in
                                publicly available sources.
                            </li>
                        </ul>
                    </div>
                    <div className={classes.statusBox}>
                        <h3>What Verified Status Provides to Asset Owners</h3>
                        <p>
                            Verified by Unit Stake allows asset owners to
                            present their projects with structured and verified
                            disclosures. Verification may help:
                        </p>
                        <ul>
                            <li>
                                <div className={classes.checkmark}>
                                    <img
                                        src={checkmarkIcon}
                                        alt="checkmark icon"
                                    />
                                </div>
                                strengthen project credibility among interested
                                stakeholders
                            </li>
                            <li>
                                <div className={classes.checkmark}>
                                    <img
                                        src={checkmarkIcon}
                                        alt="checkmark icon"
                                    />
                                </div>
                                expand access to structured project information
                            </li>
                            <li>
                                <div className={classes.checkmark}>
                                    <img
                                        src={checkmarkIcon}
                                        alt="checkmark icon"
                                    />
                                </div>
                                differentiate the project from less transparent
                                offerings
                            </li>
                            <li>
                                <div className={classes.checkmark}>
                                    <img
                                        src={checkmarkIcon}
                                        alt="checkmark icon"
                                    />
                                </div>
                                reduce the time required for independent project
                                review
                            </li>
                            <li>
                                <div className={classes.checkmark}>
                                    <img
                                        src={checkmarkIcon}
                                        alt="checkmark icon"
                                    />
                                </div>
                                simplify the path from initial discovery to
                                potential cooperation
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VerifiedPageStatus;
