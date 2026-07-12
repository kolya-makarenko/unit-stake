import classes from './ForOwners.module.css';

import marketingGraf from '../../../../../assets/images/partnerPageImages/marketingGraf.png';
import legalGraf from '../../../../../assets/images/partnerPageImages/legalGraf.png';

const CONTENT_MAP = {
    Marketing: {
        title: 'For Asset Owners, Marketing Directly Impacts',
        image: marketingGraf,
        txt: 'Without marketing, tokenisation remains technical',
        spanTxt: '— not investable.',
    },
    Legal: {
        title: 'For asset owners, legal directly impacts',
        image: legalGraf,
        txt: ' Without legal structuring, tokenisation is not scalable',
        spanTxt: '— and often not viable.',
    },
};

const ForOwners = ({ category }) => {
    const content = CONTENT_MAP[category];

    if (!content) {
        return null;
    }

    return (
        <section className={classes.forOwners}>
            <div className="wrapper">
                <div className={classes.forOwnersHeader}>
                    <h2>{content.title}</h2>
                </div>
                <div className={classes.image}>
                    <img src={content.image} alt="graf" />
                </div>
                <div className={classes.simpleTxt}>
                    {content.txt}
                    <span> {content.spanTxt}</span>
                </div>
            </div>
        </section>
    );
};

export default ForOwners;
