import classes from './AboutUsPagePrinciples.module.css';

import principlesIcon1 from '../../../../../assets/images/AboutUsPageImages/principlesIcon1.svg';
import principlesIcon2 from '../../../../../assets/images/AboutUsPageImages/principlesIcon2.svg';
import principlesIcon3 from '../../../../../assets/images/AboutUsPageImages/principlesIcon3.svg';
import principlesIcon4 from '../../../../../assets/images/AboutUsPageImages/principlesIcon4.svg';

const principlesBoxes = [
    {
        id: '01',
        text: 'Consistency over variation',
        icon: principlesIcon1,
    },
    {
        id: '02',
        text: 'Structure over interpretation',
        icon: principlesIcon2,
    },
    {
        id: '03',
        text: 'Data over assumptions',
        icon: principlesIcon3,
    },
    {
        id: '04',
        text: 'Transparency over abstraction',
        icon: principlesIcon4,
    },
];

const AboutUsPagePrinciples = () => {
    return (
        <section className={classes.principles}>
            <div className="wrapper">
                <h2>Operating Principles</h2>
                <div className={classes.principlesCards}>
                    {principlesBoxes.map((item) => (
                        <div key={item.id} className={classes.principlesCard}>
                            <div className={classes.principlesCardIcon}>
                                <img src={item.icon} alt="icon" />
                            </div>
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>
                <div className={classes.principlesText}>
                    <div className={classes.principlesTxt}>
                        We rely on verifiable data and issuer-provided
                        documentation. We standardise how key parameters are
                        presented across projects. We avoid subjective
                        interpretation.
                    </div>
                    <div className={classes.principlesTxt}>
                        We see tokenisation as an inevitable evolution of asset
                        ownership and capital markets. But evolution requires
                        structure to scale. We are building that structure.
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsPagePrinciples;
