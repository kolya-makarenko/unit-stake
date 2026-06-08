import classes from './AssetsPageEngine.module.css';

import engineImg from '../../../../../assets/images/assetsPageImages/engineImg.png';

const AssetsPageEngine = () => {
    return (
        <section className={`sectionMarginTop ${classes.engine}`}>
            <div className={classes.engineWrapper}>
                <div className={classes.engineHeader}>
                    <h2>Tokenization Engine</h2>
                    <h6>
                        Turn Your Asset Into a Liquid, Scalable Investment
                        Product
                    </h6>
                    <p>
                        Convert property, businesses, or funds into structured
                        digital tokens and manage everything through one
                        powerful platform — from issuance to investor operations
                        and payouts.
                    </p>
                </div>
                <div className={classes.engineContainer}>
                    <div className={classes.engineContainerTxt}>
                        <h3>Stop Losing Time, Capital, and Opportunities</h3>
                        <p>
                            Traditional structuring is slow, complex, and limits
                            your access to capital. Tokenization gives you a
                            faster, more flexible way to unlock liquidity and
                            scale your asset — without losing control.
                        </p>
                    </div>
                    <div className={classes.engineContainerImg}>
                        <img src={engineImg} alt="engine image" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AssetsPageEngine;
