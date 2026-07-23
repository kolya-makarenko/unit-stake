import classes from './AboutUsPageGoal.module.css';

const AboutUsPageGoal = () => {
    return (
        <section className={classes.goal}>
            <div className="wrapper">
                <div className={classes.goalHeader}>
                    <h2>Our goal is simple:</h2>
                    <p>
                        To collect, structure, and explain information about
                        tokenised projects so that users can clearly understand
                        what stands behind each asset. This includes the
                        structure being used, who the issuer is, where the
                        project is and what data is actually available for
                        verification.
                    </p>
                </div>
                <div className={classes.goalContainer}>
                    <div className={classes.goalCard}>
                        <div className={classes.goalBox}>
                            <h4>01 · Our Mission</h4>
                            <h3>Our Mission</h3>
                            <p>
                                To make the tokenised asset market easier to
                                understand, more transparent, and more
                                accessible for businesses, investors, and
                                participants of the digital economy.
                            </p>
                        </div>
                        <div className={classes.goalBox}>
                            <h4>02 · Our vision</h4>
                            <h3>Our vision</h3>
                            <p>
                                We aim to build a global informational ecosystem
                                where tokenised real-world assets can be
                                compared, analysed, and explored using a
                                consistent and structured approach to data.
                            </p>
                        </div>
                    </div>
                    <div className={classes.goalCard}>
                        <div className={classes.goalBox}>
                            <h4>03 · Our values</h4>
                            <h3>Our values</h3>
                            <p>
                                We focus on transparency, structure,
                                independence, and the quality of information. We
                                believe the RWA market can only grow sustainably
                                if every token is backed by something clear and
                                understandable: a real underlying asset, a
                                defined legal structure, a logical financial
                                model, and data that can be verified.
                            </p>
                        </div>
                        <div className={classes.goalBox}>
                            <h4>04 · Our approach</h4>
                            <h3>Our approach</h3>
                            <p>
                                We use a structured verification process called
                                Verified by UnitStake, which is based only on
                                publicly available information. We don’t make
                                recommendations. We make information easier to
                                understand.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsPageGoal;
