import HeroSection from './HeroSection/HeroSection';
import classes from './MainPage.module.css';

const MainPage = () => {
    return (
        <main className={classes.mainPage}>
            <HeroSection />
        </main>
    );
};

export default MainPage;
