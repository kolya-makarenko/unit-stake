import classes from './AboutUsPageHeroSection.module.css';

const AboutUsPageHeroSection = () => {
    return (
        <section className={classes.heroSection}>
            <div className="wrapper">
                <div className={classes.heroSectionContainer}>
                    <h2>About UnitStake Aggregator</h2>
                    <p>
                        UnitStake Aggregator is an independent informational
                        aggregator focused on tokenised assets, platforms, and
                        projects in the RWA (Real World Assets) space.
                    </p>
                    <h3>
                        We do not sell tokens and we do not provide investment
                        advice.
                    </h3>
                </div>
            </div>
        </section>
    );
};

export default AboutUsPageHeroSection;
