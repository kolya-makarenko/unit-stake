import AboutUsPageHeroSection from './AboutUsPageHeroSection/AboutUsPageHeroSection';
import AboutUsPageFirstText from './AboutUsPageFirstText/AboutUsPageFirstText';
import AboutUsPageGoal from './AboutUsPageGoal/AboutUsPageGoal';
import AboutUsPageVerification from './AboutUsPageVerification/AboutUsPageVerification';
import AboutUsPagePrinciples from './AboutUsPagePrinciples/AboutUsPagePrinciples';
import AboutUsPagePlatform from './AboutUsPagePlatform/AboutUsPagePlatform';
import AboutUsPageContacts from './AboutUsPageContacts/AboutUsPageContacts';
import classes from './AboutUsPage.module.css';

const AboutUsPage = () => {
    return (
        <main className={classes.aboutUsPage}>
            <AboutUsPageHeroSection />
            <AboutUsPageFirstText />
            <AboutUsPageGoal />
            <AboutUsPageVerification />
            <AboutUsPagePrinciples />
            <AboutUsPagePlatform />
            <AboutUsPageContacts />
        </main>
    );
};

export default AboutUsPage;
