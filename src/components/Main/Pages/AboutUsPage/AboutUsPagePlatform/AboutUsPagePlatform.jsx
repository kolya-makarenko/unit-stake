import classes from './AboutUsPagePlatform.module.css';

const AboutUsPagePlatform = () => {
    return (
        <section className={`sectionMarginTop ${classes.platform}`}>
            <div className="wrapper">
                <div className={classes.platformContainer}>
                    <h2>
                        This platform was not built as an idea — it was built as
                        a necessity.
                    </h2>
                    <p>
                        We built what we could not find in the market ourselves.
                    </p>
                    <div className={classes.platformBtns}>
                        <button className={classes.platformBtn1}>
                            Explore Projects
                        </button>
                        <button className={classes.platformBtn2}>
                            View our Insight & News
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsPagePlatform;
