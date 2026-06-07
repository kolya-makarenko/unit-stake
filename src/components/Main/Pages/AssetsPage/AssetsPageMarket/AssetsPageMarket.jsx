import classes from './AssetsPageMarket.module.css';

import img1 from '../../../../../assets/images/assetsPageImages/AssetsPageMarket1.png';
import img2 from '../../../../../assets/images/assetsPageImages/AssetsPageMarket2.png';
import img3 from '../../../../../assets/images/assetsPageImages/AssetsPageMarket3.png';

const marketBoxes = [
    {
        id: '1',
        img: img1,
        title: 'The Mayfair Hotel (London, UK)',
        txt: 'A high-end hotel in Mayfair was converted into digital equity tokens for investors.',
        amount: '$600M asset structured into tokenized format',
        link: '',
    },
    {
        id: '2',
        img: img2,
        title: 'RealT — Rental Properties (USA)',
        txt: 'Residential properties structured into tokenized ownership for global investors.',
        amount: ' 200+ properties tokenized',
        link: '',
    },
    {
        id: '3',
        img: img3,
        title: 'St. Regis Aspen Resort ',
        txt: 'A landmark luxury hotel was tokenized, allowing fractional ownership for global investors.',
        amount: '~$18M raised through token offering',
        link: '',
    },
];

const AssetsPageMarket = () => {
    return (
        <section className={`sectionMarginTop ${classes.market}`}>
            <div className="wrapper">
                <h2>Real Market Examples</h2>
                <p className={classes.marketHeaderText}>
                    How assets are already being structured and presented to
                    investors
                </p>
                <div className={classes.marketContainer}>
                    {marketBoxes.map((item) => (
                        <div key={item.id} className={classes.marketBox}>
                            <div className={classes.marketBoxImage}>
                                <img src={item.img} alt="market box image" />
                            </div>
                            <div className={classes.marketBoxText}>
                                <h3>{item.title}</h3>
                                <h4>{item.txt}</h4>
                                <div className={classes.marketBoxAmount}>
                                    {item.amount}
                                </div>
                                <div className={classes.marketBoxLink}>
                                    <div
                                        className={classes.projectsCardLinkBtn}
                                    >
                                        <p>Read more</p>
                                        <svg
                                            width="16"
                                            height="17"
                                            viewBox="0 0 16 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1 15.2758L15 1"
                                                stroke="#D34329"
                                                strokeWidth="2"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                            />
                                            <path
                                                d="M15 12.0761V1.1C15 1.04477 14.9553 1 14.9 1H4.0752"
                                                stroke="#D34329"
                                                strokeWidth="2"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AssetsPageMarket;
