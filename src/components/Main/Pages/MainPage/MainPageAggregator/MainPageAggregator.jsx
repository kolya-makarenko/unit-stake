import classes from './MainPageAggregator.module.css';

const MainPageAggregator = () => {
    return (
        <section className={`sectionMarginTop ${classes.aggregator}`}>
            <div className="wrapper">
                <p className={classes.aggregatorSimpleText}>
                    Structured data. Independent overview. Clear market
                    navigation.
                </p>
                <h2>
                    UnitStake Aggregator — Clear Market Navigation for Tokenized
                    Assets
                </h2>
            </div>
        </section>
    );
};

export default MainPageAggregator;
