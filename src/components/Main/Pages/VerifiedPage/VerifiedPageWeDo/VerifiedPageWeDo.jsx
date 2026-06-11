import classes from './VerifiedPageWeDo.module.css';

import checkmarkIcon from '../../../../../assets/images/icons/checkmark.svg';

const VerifiedPageWeDo = () => {
    return (
        <section className={classes.weDo}>
            <div className="wrapper">
                <div className={classes.weDoHeader}>
                    <h2>What Is Verified by Unit Stake</h2>
                    <p>
                        Verified by Unit Stake is a structured verification
                        framework designed to improve transparency in tokenized
                        asset markets. The verification process reviews
                        information disclosed by a project across several key
                        categories using public sources, provided documentation,
                        and independent checks where possible.
                    </p>
                </div>
                <div className={classes.weDoContainer}>
                    <div className={classes.weDoListNo}>
                        <h4>
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.5 3.5L3.5 10.5"
                                    stroke="#DB0011"
                                    strokeOpacity="0.8"
                                    strokeWidth="1.16667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M3.5 3.5L10.5 10.5"
                                    stroke="#DB0011"
                                    strokeWidth="1.16667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Unit Stake does not
                        </h4>
                        <ul>
                            <li>provide investment advice</li>
                            <li>assign ratings or scores</li>
                            <li>
                                guarantee profitability, returns, or project
                                success
                            </li>
                            <li>approve or endorse projects</li>
                        </ul>
                    </div>
                    <div className={classes.weDoListDo}>
                        <h4>
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.6673 3.5L5.25065 9.91667L2.33398 7"
                                    stroke="#34D399"
                                    strokeWidth="1.16667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Unit Stake does
                        </h4>
                        <ul>
                            <li>
                                <div>
                                    <img src={checkmarkIcon} alt="checkmark" />
                                </div>
                                verify whether disclosed information corresponds
                                with public records and submitted documentation
                            </li>
                            <li>
                                <div>
                                    <img src={checkmarkIcon} alt="checkmark" />
                                </div>
                                confirm the identity and business background of
                                key participants (KYC)
                            </li>
                            <li>
                                <div>
                                    <img src={checkmarkIcon} alt="checkmark" />
                                </div>
                                structure information into a transparent and
                                accessible format
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={classes.weDoAfterTxt}>
                    Verified status reflects the fact that information was
                    disclosed and reviewed under the published methodology.
                </div>
            </div>
        </section>
    );
};

export default VerifiedPageWeDo;
