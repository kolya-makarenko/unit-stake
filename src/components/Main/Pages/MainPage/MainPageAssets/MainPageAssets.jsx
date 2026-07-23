import classes from './MainPageAssets.module.css';

const MainPageAssets = () => {
    return (
        <section className={`sectionMarginTop ${classes.assets}`}>
            <div className="wrapper">
                <div className={classes.assetsContainer}>
                    <div className={classes.assetsBox}>
                        <h3>$29B+ Today</h3>
                        <p>Tokenised Real-World Assets</p>
                        <span>Source: Market data (Forbes)</span>
                    </div>
                    <div className={classes.assetsBox}>
                        <h3>Early Stage</h3>
                        <p>Market Phase</p>
                        <span>Based on McKinsey research</span>
                    </div>
                    <div className={classes.assetsBox}>
                        <h3>$16T by 2030</h3>
                        <p>Tokenised Assets Potential</p>
                        <span>Projected by Bloomberg Intelligence</span>
                    </div>
                    <div className={classes.assetsBox}>
                        <h3>Next Wave</h3>
                        <p>The Market Is Forming</p>
                        <span>Based on market cycles</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainPageAssets;
