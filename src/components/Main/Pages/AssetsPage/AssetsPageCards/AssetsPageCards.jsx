import { useNavigate } from 'react-router-dom';
import classes from './AssetsPageCards.module.css';

import imgCard1 from '../../../../../assets/images/assetsPageImages/AssetsPageCard1.png';
import imgCard2 from '../../../../../assets/images/assetsPageImages/AssetsPageCard2.png';

const AssetsPageCards = () => {
    const navigate = useNavigate();
    return (
        <section className={`sectionMarginTop ${classes.cards}`}>
            <div className="wrapper">
                <div className={classes.cardsContainer}>
                    <div className={classes.card}>
                        <div className={classes.cardInfo}>
                            <h2>Get Your Project Listed on UnitStake</h2>
                            <p>
                                Showcase your asset to a global audience of
                                investors through a structured and trusted data
                                environment.
                            </p>
                            <h6>
                                Increase visibility, build credibility, and
                                position your project within a growing tokenized
                                asset ecosystem.
                            </h6>
                            <button onClick={() => navigate('/contact-us')}>
                                Apply for Listing
                            </button>
                        </div>
                        <div className={classes.cardImg}>
                            <img src={imgCard1} alt="card image" />
                        </div>
                    </div>
                    <div className={classes.card}>
                        <div className={classes.cardInfo}>
                            <h2>Tokenize Your Asset & Raise Capital</h2>
                            <p>
                                Transform your asset into a scalable investment
                                opportunity. Structure, package, and open it to
                                global investors through tokenization.
                            </p>
                            <h6>
                                Unlock liquidity, attract capital, and expand
                                your investor base with the right foundation.
                            </h6>
                            <button onClick={() => navigate('/contact-us')}>
                                Apply for Tokenization
                            </button>
                        </div>
                        <div className={classes.cardImg}>
                            <img src={imgCard2} alt="card image" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AssetsPageCards;
