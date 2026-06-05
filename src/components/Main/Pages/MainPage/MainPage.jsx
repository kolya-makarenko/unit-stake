import HeroSection from './HeroSection/HeroSection';
import MainPageAssets from './MainPageAssets/MainPageAssets';
import MainPageAggregator from './MainPageAggregator/MainPageAggregator';
import MainPageFragment from './MainPageFragment/MainPageFragment';
import MainPageMarket from './MainPageMarket/MainPageMarket';
import MainPageProjects from './MainPageProjects/MainPageProjects';
import MainPagePlatforms from './MainPagePlatforms/MainPagePlatforms';
import classes from './MainPage.module.css';

const MainPage = () => {
    return (
        <main className={classes.mainPage}>
            <HeroSection />
            <MainPageAssets />
            <MainPageAggregator />
            <MainPageFragment />
            <MainPageMarket />
            <MainPageProjects />
            <MainPagePlatforms />
        </main>
    );
};

export default MainPage;
