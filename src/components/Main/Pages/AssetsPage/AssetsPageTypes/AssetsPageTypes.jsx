import classes from './AssetsPageTypes.module.css';

import typesIcon1 from '../../../../../assets/images/assetsPageImages/typesIcon1.svg';
import typesIcon2 from '../../../../../assets/images/assetsPageImages/typesIcon2.svg';
import typesIcon3 from '../../../../../assets/images/assetsPageImages/typesIcon3.svg';
import typesIcon4 from '../../../../../assets/images/assetsPageImages/typesIcon4.svg';
import typesIcon5 from '../../../../../assets/images/assetsPageImages/typesIcon5.svg';
import typesIcon6 from '../../../../../assets/images/assetsPageImages/typesIcon6.svg';
import typesIcon7 from '../../../../../assets/images/assetsPageImages/typesIcon7.svg';
import typesIcon8 from '../../../../../assets/images/assetsPageImages/typesIcon8.svg';

const typesBoxes = [
    {
        id: '1',
        icon: typesIcon1,
        txt: 'Real Estate',
    },
    {
        id: '2',
        icon: typesIcon2,
        txt: 'Land & Development',
    },
    {
        id: '3',
        icon: typesIcon3,
        txt: 'Operating Businesses',
    },
    {
        id: '4',
        icon: typesIcon4,
        txt: 'Hospitality & Hotels',
    },
    {
        id: '5',
        icon: typesIcon5,
        txt: 'Industrial & Logistics',
    },
    {
        id: '6',
        icon: typesIcon6,
        txt: 'Energy & Infrastructure',
    },
    {
        id: '7',
        icon: typesIcon7,
        txt: 'Funds & Portfolios',
    },
    {
        id: '8',
        icon: typesIcon8,
        txt: 'IP & Royalty Assets',
    },
];

const AssetsPageTypes = () => {
    return (
        <section className={classes.types}>
            <div className="wrapper">
                <div className={classes.typesHeader}>
                    <div className={classes.fakeBtn}>
                        <div className={classes.fakeBtnContainer}>
                            <div className={classes.fakeBtnCircle}></div>
                            <p>Suitable Asset Types</p>
                        </div>
                    </div>
                    <p className={classes.typesHeaderText}>
                        Tokenization frameworks apply across a broad spectrum of
                        real-world assets and ownership structures.
                    </p>
                </div>
                <div className={classes.typesContainer}>
                    {typesBoxes.map((item) => (
                        <div key={item.id} className={classes.typesBox}>
                            <div className={classes.typesBoxIcon}>
                                <img src={item.icon} alt="icon" />
                            </div>
                            <h4>{item.txt}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AssetsPageTypes;
