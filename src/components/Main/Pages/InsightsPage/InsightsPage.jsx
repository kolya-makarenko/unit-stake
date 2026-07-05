import News from './News/News';
import classes from './InsightsPage.module.css';

const InsightsPage = () => {
    return (
        <main className={classes.insightsPage}>
            <section className={classes.news}>
                <div className="wrapper">
                    <h2>News & Market Updates</h2>
                    <p>
                        Explore market analysis, tokenization trends, platform
                        research, industry updates, and educational content
                        across real-world assets and digital ownership.
                    </p>
                </div>
            </section>
            <News />
            <section className={classes.insights}>
                <div className="wrapper">
                    <h2>Latest Insights</h2>
                </div>
            </section>
            <section className={classes.reports}>
                <div className="wrapper">
                    <h2>Reports & Research</h2>
                </div>
            </section>
        </main>
    );
};

export default InsightsPage;
