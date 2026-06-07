import AssetsPageHeroSection from './AssetsPageHeroSection/AssetsPageHeroSection';
import AssetsPageTokenizing from './AssetsPageTokenizing/AssetsPageTokenizing';
import AssetsPageTypes from './AssetsPageTypes/AssetsPageTypes';
import AssetsPageMarket from './AssetsPageMarket/AssetsPageMarket';

import classes from './AssetsPage.module.css';

const AssetsPage = () => {
    return (
        <main className={classes.assetsPage}>
            <AssetsPageHeroSection />
            <AssetsPageTokenizing />
            <AssetsPageTypes />
            <AssetsPageMarket />
        </main>
    );
};

export default AssetsPage;
