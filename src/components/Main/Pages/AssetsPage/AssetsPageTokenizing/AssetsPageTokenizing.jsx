import classes from './AssetsPageTokenizing.module.css';

import tokenizingIcon1 from '../../../../../assets/images/assetsPageImages/tokenizingIcon1.svg';
import tokenizingIcon2 from '../../../../../assets/images/assetsPageImages/tokenizingIcon2.svg';
import tokenizingIcon3 from '../../../../../assets/images/assetsPageImages/tokenizingIcon3.svg';
import tokenizingIcon4 from '../../../../../assets/images/assetsPageImages/tokenizingIcon4.svg';
import tokenizingIcon5 from '../../../../../assets/images/assetsPageImages/tokenizingIcon5.svg';

const tokenizingCards = [
    {
        id: '01',
        icon: tokenizingIcon1,
        header: 'Raise Capital',
        text: 'Open structured access to global investor pools through compliant tokenized offerings.',
    },
    {
        id: '02',
        icon: tokenizingIcon2,
        header: 'Accelerate Growth',
        text: 'Convert balance-sheet assets into deployable capital and shorten the path to scale.',
    },
    {
        id: '03',
        icon: tokenizingIcon3,
        header: 'Provide Investor Liquidity',
        text: 'Introduce structured liquidity mechanics that traditional ownership models cannot offer.',
    },
    {
        id: '04',
        icon: tokenizingIcon4,
        header: 'Expand Your Investor Base',
        text: 'Reach qualified investors across jurisdictions through a structured visibility surface.',
    },
    {
        id: '05',
        icon: tokenizingIcon5,
        header: 'Scale Your Assets',
        text: 'Build a programmable, modular foundation for ownership, distribution, and growth.',
    },
];

const AssetsPageTokenizing = () => {
    return (
        <section className={classes.tokenizing}>
            <div className="wrapper">
                <h2>Tokenizing your assets you gain the opportunity:</h2>
                <div className={classes.tokenizingContainer}>
                    {tokenizingCards.map((item) => (
                        <div key={item.id} className={classes.tokenizingCard}>
                            <div className={classes.tokenizingCardPosition}>
                                <div
                                    className={
                                        classes.tokenizingCardPositionImg
                                    }
                                >
                                    <img src={item.icon} alt="icon" />
                                </div>
                                <div
                                    className={
                                        classes.tokenizingCardPositionNumber
                                    }
                                >
                                    {`${item.id} / 0${tokenizingCards.length}`}
                                </div>
                            </div>
                            <h3>{item.header}</h3>
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AssetsPageTokenizing;
