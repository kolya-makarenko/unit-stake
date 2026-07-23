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
        text: 'Unlock access to global capital more efficiently, without the limitations and complexity of traditional financing.',
    },
    {
        id: '02',
        icon: tokenizingIcon2,
        header: 'Accelerate Growth',
        text: 'Access funding to scale your business and unlock new growth opportunities.',
    },
    {
        id: '03',
        icon: tokenizingIcon3,
        header: 'Provide Liquidity',
        text: 'Create more flexible entry and exit opportunities for participants in your project.',
    },
    {
        id: '04',
        icon: tokenizingIcon4,
        header: 'Broaden your audience of interested participants',
        text: 'Open your asset to an international audience and new sources of capital.',
    },
    {
        id: '05',
        icon: tokenizingIcon5,
        header: 'Scale Your Assets',
        text: 'Leverage tokenization to expand your assets and support long-term growth.',
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
