import classes from './AssetsPageChoice.module.css';

import choiceImg from '../../../../../assets/images/assetsPageImages/ecosystemMap.png';
import choiceIcon1 from '../../../../../assets/images/assetsPageImages/choice1.svg';
import choiceIcon2 from '../../../../../assets/images/assetsPageImages/choice2.svg';
import choiceIcon3 from '../../../../../assets/images/assetsPageImages/choice3.svg';
import choiceIcon4 from '../../../../../assets/images/assetsPageImages/choice4.svg';
import choiceIcon5 from '../../../../../assets/images/assetsPageImages/choice5.svg';

const choiceBoxes = [
    {
        id: '1',
        icon: choiceIcon1,
        title: 'Structure and present your asset',
        subtitle: 'POSITIONING',
        text: 'Launched the tokenized fund BUIDL, signaling institutional confidence in blockchain-based fund infrastructure.',
    },
    {
        id: '2',
        icon: choiceIcon2,
        title: 'Prepare for market exposure',
        subtitle: 'MARKET READINESS',
        text: 'We help package your asset with the right materials and narrative',
    },
    {
        id: '3',
        icon: choiceIcon3,
        title: 'Make your project investor-ready',
        subtitle: 'CLARITY',
        text: 'Turn complex structures into clear, understandable opportunities',
    },
    {
        id: '4',
        icon: choiceIcon4,
        title: 'Navigate market opportunities',
        subtitle: 'DISCOVERY',
        text: 'Understand where your asset fits within the evolving tokenized market',
    },
    {
        id: '5',
        icon: choiceIcon5,
        title: 'Structured data & visibility layer',
        subtitle: 'INTELLIGENCE',
        text: 'Access a standardized framework for presenting and comparing projects',
    },
];

const AssetsPageChoice = () => {
    return (
        <section className={`sectionMarginTop ${classes.choice}`}>
            <div className="wrapper">
                <div className={classes.choiceHeader}>
                    <div className={classes.fakeBtn}>
                        <div className={classes.fakeBtnContainer}>
                            <div className={classes.fakeBtnCircle}></div>
                            <p>Ecosystem Positioning</p>
                        </div>
                    </div>
                    <h2>Why Projects Choose UnitStake Aggregator?</h2>
                    <h3>
                        UnitStake helps asset owners gain additional visibility
                        for their projects through the structured presentation
                        of information. We help make projects more
                        understandable, transparent, and easier to evaluate for
                        interested market participants.
                    </h3>
                </div>
                <div className={classes.choiceContainer}>
                    <div className={classes.choiceInfo}>
                        <div className={classes.choiceInfoHeader}>
                            We help you:
                        </div>
                        <ul className={classes.choiceInfoContainer}>
                            {choiceBoxes.map((item) => (
                                <li
                                    key={item.id}
                                    className={classes.choiceInfoBox}
                                >
                                    <div className={classes.choiceInfoBoxIcon}>
                                        <img src={item.icon} alt="icon" />
                                    </div>
                                    <div className={classes.choiceInfoBoxTxt}>
                                        <h4>{item.title}</h4>
                                        <h5>{item.subtitle}</h5>
                                        <p>{item.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className={classes.choiceInfoContainerText}>
                            Not an issuer. Not a service provider. A structured
                            visibility layer that helps the market navigate
                            itself.
                        </div>
                    </div>
                    <div className={classes.choiceImg}>
                        <img src={choiceImg} alt="Ecosystem Map" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AssetsPageChoice;
