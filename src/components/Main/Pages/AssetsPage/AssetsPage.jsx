import AssetsPageHeroSection from './AssetsPageHeroSection/AssetsPageHeroSection';
import AssetsPageTokenizing from './AssetsPageTokenizing/AssetsPageTokenizing';

import classes from './AssetsPage.module.css';

const AssetsPage = () => {
    return (
        <main className={classes.assetsPage}>
            <AssetsPageHeroSection />
            <AssetsPageTokenizing />
        </main>
    );
};

export default AssetsPage;
