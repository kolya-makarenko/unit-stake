import VerifiedPageHeroSection from './VerifiedPageHeroSection/VerifiedPageHeroSection';
import VerifiedPageWeDo from './VerifiedPageWeDo/VerifiedPageWeDo';
import VerifiedPageMatters from './VerifiedPageMatters/VerifiedPageMatters';
import classes from './VerifiedPage.module.css';

const VerifiedPage = () => {
    return (
        <main className={classes.verifiedPage}>
            <VerifiedPageHeroSection />
            <VerifiedPageWeDo />
            <VerifiedPageMatters />
        </main>
    );
};

export default VerifiedPage;
