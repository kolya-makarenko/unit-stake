import classes from './HeroSection.module.css';

const HeroSection = () => {
    return (
        <section className={classes.heroSection}>
            <div className="wrapper">
                <div className={classes.heroSectionContainer}>
                    Navigate tokenised real-world assets with clarity,
                    structure, and confidence
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
