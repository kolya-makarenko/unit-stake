import classes from './VerifiedPageDisclaimer.module.css';

const VerifiedPageDisclaimer = (props) => {
    return (
        <section className={classes.disclaimer}>
            <div className="wrapper">
                <div className={classes.disclaimerContainer}>
                    <h3>Disclaimer</h3>
                    {props.text}
                </div>
            </div>
        </section>
    );
};

export default VerifiedPageDisclaimer;
