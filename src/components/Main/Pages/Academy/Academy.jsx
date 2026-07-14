import classes from './Academy.module.css';

const Academy = () => {
    return (
        <main className={classes.academyPage}>
            <section className={classes.heroSection}>
                <div className="wrapper">
                    <div className={classes.heroSectionContainer}>
                        <div className={classes.fakeBtn}>
                            <div className={classes.fakeBtnContainer}>
                                <div className={classes.fakeBtnCircle}></div>
                                <p>Beyond Tokens: Structure Matters</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Academy;
