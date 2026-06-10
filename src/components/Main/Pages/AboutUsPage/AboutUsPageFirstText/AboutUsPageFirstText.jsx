import classes from './AboutUsPageFirstText.module.css';

const AboutUsPageFirstText = () => {
    return (
        <section className={classes.firsText}>
            <div className="wrapper">
                <div className={classes.firsTextContainer}>
                    <div className={classes.text}>
                        We operate within one of the fastest-growing and least
                        structured segments of modern finance — tokenised
                        real-world assets. This market combines technology, law,
                        and capital — but lacks unified standards of
                        understanding.
                    </div>
                    <div className={classes.text}>
                        Information is fragmented. Structures vary. Comparisons
                        are difficult. Investors and market participants often
                        rely on incomplete or inconsistent data.
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsPageFirstText;
