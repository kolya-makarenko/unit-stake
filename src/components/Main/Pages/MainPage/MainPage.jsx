import HeroSection from './HeroSection/HeroSection';
import MainPageAssets from './MainPageAssets/MainPageAssets';
import MainPageAggregator from './MainPageAggregator/MainPageAggregator';
import MainPageFragment from './MainPageFragment/MainPageFragment';
import MainPageMarket from './MainPageMarket/MainPageMarket';
import classes from './MainPage.module.css';

const MainPage = () => {
    return (
        <main className={classes.mainPage}>
            <HeroSection />
            <MainPageAssets />
            <MainPageAggregator />
            <MainPageFragment />
            <MainPageMarket />
        </main>
    );
};

export default MainPage;
