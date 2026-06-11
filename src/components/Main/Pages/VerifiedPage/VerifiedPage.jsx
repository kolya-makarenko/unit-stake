import VerifiedPageHeroSection from './VerifiedPageHeroSection/VerifiedPageHeroSection';
import VerifiedPageWeDo from './VerifiedPageWeDo/VerifiedPageWeDo';
import classes from './VerifiedPage.module.css';

const VerifiedPage = () => {
    return (
        <main className={classes.verifiedPage}>
            <VerifiedPageHeroSection />
            <VerifiedPageWeDo />
        </main>
    );
};

export default VerifiedPage;
