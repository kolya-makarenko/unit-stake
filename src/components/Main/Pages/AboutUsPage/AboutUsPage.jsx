import AboutUsPageHeroSection from './AboutUsPageHeroSection/AboutUsPageHeroSection';
import classes from './AboutUsPage.module.css';

const AboutUsPage = () => {
    return (
        <main className={classes.aboutUsPage}>
            <AboutUsPageHeroSection />
        </main>
    );
};

export default AboutUsPage;
