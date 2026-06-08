import AssetsPageHeroSection from './AssetsPageHeroSection/AssetsPageHeroSection';
import AssetsPageTokenizing from './AssetsPageTokenizing/AssetsPageTokenizing';
import AssetsPageTypes from './AssetsPageTypes/AssetsPageTypes';
import AssetsPageMarket from './AssetsPageMarket/AssetsPageMarket';
import AssetsPagePath from './AssetsPagePath/AssetsPagePath';
import AssetsPageChoice from './AssetsPageChoice/AssetsPageChoice';
import AssetsPageCards from './AssetsPageCards/AssetsPageCards';
import AssetsPageEngine from './AssetsPageEngine/AssetsPageEngine';

import classes from './AssetsPage.module.css';

const AssetsPage = () => {
    return (
        <main className={classes.assetsPage}>
            <AssetsPageHeroSection />
            <AssetsPageTokenizing />
            <AssetsPageTypes />
            <AssetsPageMarket />
            <AssetsPagePath />
            <AssetsPageChoice />
            <AssetsPageCards />
            <AssetsPageEngine />
        </main>
    );
};

export default AssetsPage;
