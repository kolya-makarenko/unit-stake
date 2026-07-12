import classes from './Approach.module.css';

const Approach = (props) => {
    const txt = props.approach_text;

    if (!txt) {
        return null;
    }

    return (
        <section className={classes.approach}>
            <div className="wrapper">
                <h2>Approach to Projects</h2>
                <p>{txt}</p>
            </div>
        </section>
    );
};

export default Approach;
