import HeroSection from './HeroSection/HeroSection';
import MainPageAssets from './MainPageAssets/MainPageAssets';
import classes from './MainPage.module.css';
import MainPageAggregator from './MainPageAggregator/MainPageAggregator';

const MainPage = () => {
    return (
        <main className={classes.mainPage}>
            <HeroSection />
            <MainPageAssets />
            <MainPageAggregator />
        </main>
    );
};

export default MainPage;
