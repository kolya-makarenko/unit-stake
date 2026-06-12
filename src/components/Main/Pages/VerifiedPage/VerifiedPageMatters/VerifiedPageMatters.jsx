import classes from './VerifiedPageMatters.module.css';

import projectImage from '../../../../../assets/images/verifiedPageImages/projectImage.png';
import checkmarkIcon from '../../../../../assets/images/icons/checkmark.svg';

const helpsBoxes = [
    {
        id: '1',
        text: 'provided information across established categories',
        icon: checkmarkIcon,
    },
    {
        id: '2',
        text: 'agreed to a structured review process',
        icon: checkmarkIcon,
    },
    {
        id: '3',
        text: 'undergone verification based on a transparent methodology',
        icon: checkmarkIcon,
    },
];

const VerifiedPageMatters = () => {
    return (
        <section className={`sectionMarginTop ${classes.matters}`}>
            <div className="wrapper">
                <div className={classes.mattersContainer}>
                    <div className={classes.mattersContainerText}>
                        <h2>Why Verification Matters</h2>
                        <p>
                            The tokenized asset market is growing rapidly.
                            Alongside this growth comes an increasing amount of
                            information — varying in quality, completeness, and
                            reliability.
                        </p>
                        <h4>
                            When conducting independent research, users often
                            encounter claims that are difficult to verify:
                        </h4>
                        <ul>
                            <li>
                                legal structures presented without supporting
                                documentation
                            </li>
                            <li>
                                teams introduced without identity confirmation
                            </li>
                            <li>
                                financial metrics published without methodology
                                or context
                            </li>
                            <li>technical claims without independent review</li>
                        </ul>
                    </div>
                    <div className={classes.mattersContainerImg}>
                        <img src={projectImage} alt="project image" />
                    </div>
                </div>
                <div className={classes.helpsContainer}>
                    <h3>
                        Verified by UnitStake helps structure and verify
                        disclosed information.
                    </h3>
                    <div className={classes.helpsCards}>
                        {helpsBoxes.map((item) => (
                            <div key={item.id} className={classes.helpsCard}>
                                <div className={classes.helpsCardCheck}>
                                    <img src={item.icon} alt="checkmark" />
                                </div>
                                <div className={classes.helpsCardTxt}>
                                    {item.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={classes.helpsAfterText}>
                        Verification is not an assessment of investment quality,
                        project attractiveness, or future performance. It is a
                        confirmation that disclosed information was reviewed at
                        the time of verification.
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VerifiedPageMatters;
